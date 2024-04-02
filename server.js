// Serverving code

// DB
require('dotenv').config();
const url = process.env.MONGODB_URI;
const MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require('mongodb');
const client = new MongoClient(url);
client.connect(console.log("mongodb connected"));

// Email API
const nodemailer = require('nodemailer');
const { google }  = require('googleapis');
const CLIENT_ID = process.env.CLIENT_ID;;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Connection Management
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();
app.set('port', PORT);

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS');
    next();
});


app.post('/api/searchPost', async (req, res, next) => 
{
    // incoming: username, name, genre
    // outgoing: results[], error
    var error = '';

    const { username, name, genre, searchType } = req.body;
    const fields = [username, name, genre, searchType];

    const db = client.db("oMarketDB");

    try{
        let numFieds = 0;
        for (let i = 0; i < 3; i++)
        {
            if (fields[i] != "")
                numFieds++;
        }

        if (numFieds > 1)
            throw new Error('Too many used fields');
        else if (numFieds == 0)
            throw new Error('Requires at least one field to search');
        
        //since the other fields are empty if your searching by a specific field (i.e. searching by username) you only need to check if the searchType is ALL to indicate
        //if you need to search any of the fields or just return all the posts.

        //the search results returns the post object instead of the post object id. Requested by Maksim.

        if (searchType != 'ALL'){
            if (username != "")
            {

                var _search = username.trim()
                const results = await db.collection('Posts').find({"username":{$regex:_search+'.*', $options:'i'}}).toArray();

                var _ret = [];

                for( var i=0; i< results.length; i++ )
                {
                    _ret.push( results[i]);
                }
            }

            if (name != "" )
            {
                var _search = name.trim()
                const results = await db.collection('Posts').find({"name":{$regex:_search+'.*', $options:'i'}}).toArray();

                var _ret = [];

                for( var i=0; i< results.length; i++ )
                {
                    _ret.push( results[i]);
                }
            }
                

            if (genre != "" )
            {
                var _search = genre.trim()
                const results = await db.collection('Posts').find({"genre":{$regex:_search+'.*', $options:'i'}}).toArray();

                var _ret = [];

                for( var i=0; i< results.length; i++ )
                {
                    _ret.push( results[i]);
                }
            }
        }

        else if(searchType == 'ALL'){
            //returns all posts.
            const results = await db.collection('Posts').find();
        }

    }
    catch(e)
    {
        error = e.toString();
    }
    

    var ret = {results:_ret, error:error};
    res.status(200).json(ret);
});

app.post('/api/login', async (req, res, next) => 
{
    // incoming: username, password
    // outgoing: userInfo, error

    const {username, password} = req.body;

    const db = client.db("oMarketDB");
    const results = await db.collection('Users').find({username: username, password: password.hashCode()}).toArray();

    var id = -1;
    var fn = '';
    var ln = '';
    var email = '';
    var err = '';

    if( results.length != 0 )
    {
        id = results[0]._id;
        fn = results[0].firstname;
        ln = results[0].lastname;
        email = results[0].email;
    }
    else
    {
        err = 'No Records Found';
    }

    var ret = { id:id, firstName:fn, lastName:ln, email: email, error:err};
    res.status(200).json(ret);
});

app.post('/api/register', async (req, res, next) => 
{
    // incoming: firstname, lastname, username, password, email, phoneNumber
    // outgoing: error, newUserId

    const db = client.db("oMarketDB");

    var error = '';
    const {firstname, lastname, username, password, email, phoneNumber} = req.body;

    let verifyNum = randomNum();
    let aboutMe = '';
    let newId = -1;
    let interested = [];


    const currentTime = Date.now();
    const oneHour = 60*60*1000; // 1000 ms in one second; 60 second in one min; 60 min in one hour
    const TTL = oneHour + currentTime;


    const newRegister = {firstname: firstname, 
                         lastname: lastname, 
                         username: username, 
                         password: password.hashCode(), 
                         email: email, 
                         phoneNumber: phoneNumber, 
                         aboutme: aboutMe, 
                         verifyNum: verifyNum,
                         ttl: TTL,
                         interestedIn: interested};

    const results = await db.collection('Users').find({username: username, email: email}).toArray();

    try
    {
        if (results.length > 0)
        {
            throw new Error('User Already Exists');
        }

        newId = (await db.collection('Users').insertOne(newRegister)).insertedId;
    }
    catch(e)
    {
        error = e.toString();
    }

    verifyEmail(email, verifyNum);

    var ret = { _id: newId, verifyNum: verifyNum, error: error};
    res.status(200).json(ret);
});

async function verifyEmail(email, verifyNum)
{
    let message = 'Here is your verification code: ' + verifyNum;

    try
    {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'randomrandomrandom120@gmail.com',
                clientId: CLIENT_ID,
                clientSecret:  CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        const mailOptions = {
            from: 'Open Market <randomrandomrandom120@gmail.com>',
            to: email,
            subject: 'Verification Code',
            text: message
        };
        
        const result = await transport.sendMail(mailOptions);
    }
    catch(e)
    {
        console.log(e.toString());
    }

}

app.post('/api/emailVerify', async (req, res, next) =>
{
    // incoming: id, verifyNum
    // outgoing: id, error
    
    const {id, verifyNum} = req.body;
    const db = client.db('oMarketDB');

    var error = '';
    const currentTime = Date.now();

    try{
        const user = await db.collection('Users').findOne({_id: new ObjectId(id)});

        if (user == null)
            throw new Error('User Id Not Found');

        const TTL = user.ttl;
        const userNum = user.verifyNum;

        if (TTL <= 0) // If the database says TTL is 0 or negative then we already verified the user
            throw new Error('User is already verified');
        
        if (TTL >= currentTime && verifyNum == userNum) // If the user verified in time and has the correct number verify them in the db
        {
            const newUser = await db.collection('Users').updateOne({_id: new ObjectId(id)}, {$set: {verifyNum: 0, ttl: -1}})
        }
        else if (TTL < currentTime) // If they didn't verify in time then delete their registration in the db
        {
            const newUser = await db.collection('Users').deleteOne({_id: new ObjectId(id)});
            throw new Error('User didn\'t verify in time');
        }
        else if (verifyNum !=  userNum) // If the number isn't correct throw error saying so
        {
            throw new Error('Incorrect Verification Number');
        }
        else // If we reach here then there is probably a internal database issue
        {
            throw new Error('Undefined Behavior Spotted');
        }
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = { _id: id, error: error};
    res.status(200).json(ret);
});

app.post('/api/editUser', async (req, res, next) => 
{
    // incoming: id, newUserInfo
    // outgoing: id, error
    
    const {id, newFirstName, newLastName, newUserName, newPassword, newEmail, newPhoneNumber, newAboutMe} = req.body;

    const db = client.db("oMarketDB");

    var error = '';

    try{
        const newUser = await db.collection('Users').updateOne({_id: new ObjectId(id)}, {$set:
                                                               {firstname: newFirstName,
                                                                lastname: newLastName, 
                                                                username: newUserName,
                                                                password: newPassword.hashCode(),
                                                                email: newEmail,
                                                                phoneNumber: newPhoneNumber, 
                                                                aboutme: newAboutMe}});
    }
    catch(e)
    {
        error = e.toString();
    }
    

    var ret = {_id: id, error: error};
    res.status(200).json(ret);
});

app.post('/api/createPost', async(req, res, next) =>{

    //incoming: username, name, condition, genre, price, desc
    //outgoing: id, error

    const {username, name, genre, price, desc, condition} = req.body;
    const db = client.db("oMarketDB");


    let usersInterested = [];

    const newPost = {username: username, name: name, genre: genre, price: price, desc: desc, condition: condition, usersInterested: usersInterested};
    const results = await db.collection('Posts').find({username: username, name: name}).toArray();

    var id = -1;
    var err = '';

    try{

        if(results.length > 0){
            throw new Error('Post already exists');
        }

        //creates new post and grabs the new id to return 
        id = (await db.collection('Posts').insertOne(newPost)).insertedId;
    }
    catch(e){
        err = e.toString();
    }

    var ret = { _id: id, error: err};
    res.status(200).json(ret);
});

app.post('/api/editPost', async(req, res, next) => {

    //incoming: id, username, condition, genre, price, desc
    //outgoing: id, error

    var err = '';

    const {id, username, name, genre, price, desc, condition} = req.body;
    const db = client.db("oMarketDB");

    const newRegister = {id: id, username: username, name: name, genre: genre, price: price, desc: desc, condition: condition};
    
    //just updates all the fields and if they're unchanged they just update from the prev value.
    try{
        const user = db.collection('Posts').updateOne({_id: new ObjectId(id)}, 
        {$set: {username: username, name: name, genre: genre, price: price, desc: desc, condition: condition}});
        
    }
    catch(e){
        err = e.toString();
    }

    var ret = {_id: id, error: err};
    res.status(200).json(ret);
});



app.post('/api/deletePost', async(req, res, next) => {
    //incoming: id
    //outgoing: id, error

    var err = '';

    const {id} = req.body;
    const db = client.db("oMarketDB");
    
    try{
        const post = await db.collection('Posts').findOneAndDelete({_id: new ObjectId(id)})

        if (!post)
            throw new Error('Post was not found');
    }
    catch(e){
        err = e.toString();
    }

    var ret = {_id: id, error: err};
    res.status(200).json(ret);
});

app.post('/api/interestAddition', async(req, res, next) => {

    //incoming: userId, postId
    //outgoing: error

    var err = '';

    const {userId, postId} = req.body;
    const db = client.db("oMarketDB");
    
    
    try {
        const post = db.collection('Posts').updateOne({_id: new ObjectId(postId)}, {$push: {usersInterested: userId}});
        const user = db.collection('Users').updateOne({_id: new ObjectId(userId)}, {$push: {interestedIn: postId}});
        
    }
    catch(e){
        err = e.toString();
    }

    var ret = {error: err};
    res.status(200).json(ret);
});

// Hash Function for Password
String.prototype.hashCode = function() 
{
    var hash = 0, i, chr;
    
    if (this.length === 0) return hash;

    for (i = 0; i < this.length; i++) 
    {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }

    return hash;
}

// generates a random number for email verification
function randomNum()
{
    return Math.ceil(Math.random() * (99999 - 10000) + 10000);
}

// DO NOT MESS WITH THIS (Required to make website work)
// Server static assets if in production
if (process.env.NODE_ENV === 'production')
{
    // Set static folder
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) =>
    {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

app.listen(PORT, () =>
{
    console.log('Server listening on port ' + PORT);
});
