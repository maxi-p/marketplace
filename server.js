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
const pass = process.env.pass;

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

// Image Storage
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/imageUploads');
    },
    filename: function (req, file, callback) {
        const filename = Date.now() + file.originalname;
        callback(null, filename);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 12 * 1024 * 1024 // 12 mb image limit just to be on the safe side
    }
});

const imageSchema = new mongoose.Schema({ // Defines image objects
    name: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    }
});
const imageModel = mongoose.model("imagemodel", imageSchema);

app.post('/api/passwordRequest', async (req, res, next) => 
{
    const {username} = req.body;
    const db = client.db('oMarketDB');
    let email = '';
    let verifyNum = randomNum();
    let error = '';


    try{
        const user = await db.collection('Users').find({username: username}).toArray();

        if (!user)
            throw new Error('User is not in Database');
        
        email = user[0].email;

        await sendEmail(email, verifyNum);

        const update = await db.collection('Users').updateOne({username: username}, {$set: {verifyNum: verifyNum}});
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = {username: username, email: email, error: error};
    res.status(200).json(ret);
});

app.post('/api/passwordChange', async (req, res, next) => 
{
    const {username, verifyNum, newPassword} = req.body;
    const db = client.db('oMarketDB');
    let error = '';

    var user = null;

    try{
        user = await db.collection('Users').findOne({username: username});

        if (!user)
            throw new Error('User is not in Database');
        
        var dbVerifyNum = user.verifyNum;

        if (dbVerifyNum == verifyNum)
        {
            const change = await db.collection('Users').updateOne({username: username}, {$set: {password: newPassword.hashCode(), verifyNum: 0}});
        }
        else
        {
            throw new Error('Verify Num doesn\'t match database');
        }
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = {id: user._id, firstName: user.firstname, lastName: user.lastname, username: username, email: user.email, phoneNumber: user.phoneNumber, aboutMe: user.aboutme, profilePic: user.profilePic, ttl: user.ttl, interestedIn: user.interestedIn, error: error};
    res.status(200).json(ret);
});

app.post('/api/searchPost', async (req, res, next) =>
{
    // incoming: username, name, genre
    // outgoing: results[], error
    var error = '';
    var searches = [];

    var userResults = [];
    var nameResults = [];
    var genreResults = [];

    const {username, name, genre} = req.body;

    const db = client.db("oMarketDB");

    try{
        var usernameTrim = username.trim();
        var nameTrim = name.trim();
        var genreTrim = genre.trim();

        if (username === '' && name === '' && genre === '')
        {
            searches = await db.collection('Posts').find({}).toArray();
        }
        else
        {
            if (username !== '')
                userResults = await db.collection('Posts').find({username: {$regex: usernameTrim + '.*', $options: 'i'}}).toArray();

            if (name !== '')
                nameResults = await db.collection('Posts').find({name: {$regex: nameTrim + '.*', $options: 'i'}}).toArray();

            if (genre !== '')
                genreResults = await db.collection('Posts').find({genre: {$regex: genreTrim + '.*', $options: 'i'}}).toArray();

            searches = [...userResults, ...nameResults, ...genreResults];
        }
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = {results: searches, error:error};
    res.status(200).json(ret);
});

app.post('/api/noRegexSearchPost', async (req, res, next) =>
{
    // incoming: username, name, genre
    // outgoing: results[], error
    var error = '';
    var searches = [];

    var userResults = [];
    var nameResults = [];
    var genreResults = [];

    const {username, name, genre} = req.body;

    const db = client.db("oMarketDB");

    try{
        var usernameTrim = username.trim();
        var nameTrim = name.trim();
        var genreTrim = genre.trim();

        if (username === '' && name === '' && genre === '')
        {
            searches = await db.collection('Posts').find({}).toArray();
        }
        else
        {
            if (username !== '')
                userResults = await db.collection('Posts').find({username: usernameTrim}).toArray();

            if (name !== '')
                nameResults = await db.collection('Posts').find({name: nameTrim}).toArray();

            if (genre !== '')
                genreResults = await db.collection('Posts').find({genre: genreTrim}).toArray();

            searches = [...userResults, ...nameResults, ...genreResults];
        }
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = {results: searches, error:error};
    res.status(200).json(ret);
});

app.post('/api/searchPostPaged', async (req, res, next) =>
{
    // incoming: username, name, genre, limit, skip
    // outgoing: results[], error
    var error = '';
    var searches = [];

    const {username, name, genre, limit, skip} = req.body;

    const db = client.db("oMarketDB");

    try{
        var usernameTrim = username.trim();
        var nameTrim = name.trim();
        var genreTrim = genre.trim();

        var QueryList = [];
        var query = {};
        if (username !== '') {
            QueryList.push({username: {$regex: usernameTrim + '.*', $options: 'i'}});
        }
        if (name !== '') {
            QueryList.push({username: {$regex: nameTrim + '.*', $options: 'i'}});
        }
        if (genre !== '') {
            QueryList.push({username: {$regex: genreTrim + '.*', $options: 'i'}});
        }
        if (username != '' || name != '' || genre != '')
        {
            query = {$or: QueryList};
        }
        searches = await db.collection('Posts').find(query).limit(limit).skip(skip).toArray();

    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = {results: searches, error:error};
    res.status(200).json(ret);
});

app.post('/api/searchPostPaged', async (req, res, next) =>
{
    // incoming: username, name, genre, limit, skip
    // outgoing: results[], error
    var error = '';
    var searches = [];

    var userResults = [];
    var nameResults = [];
    var genreResults = [];

    const {username, name, genre, limit, skip} = req.body;

    const db = client.db("oMarketDB");

    try{
        var usernameTrim = username.trim();
        var nameTrim = name.trim();
        var genreTrim = genre.trim();

        var QueryList = [];
        var query = {};
        if (username !== '') {
            QueryList.push({username: {$regex: usernameTrim + '.*', $options: 'i'}});
        }
        if (name !== '') {
            QueryList.push({username: {$regex: nameTrim + '.*', $options: 'i'}});
        }
        if (genre !== '') {
            QueryList.push({username: {$regex: genreTrim + '.*', $options: 'i'}});
        }
        if (username != '' || name != '' || genre != '')
        {
            query = {$or: QueryList};
        }
        searches = await db.collection('Posts').find(query).limit(limit).skip(skip).toArray();

    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = {results: searches, error:error};
    res.status(200).json(ret);
});
app.post('/api/searchUser', async (req, res, next) => 
{
    //incoming: username
    //outgoing: userInfo, error

    const { username } = req.body;

    const db = client.db("oMarketDB");
    var error = '';

    var userResults = [];

    try{
        userResults = await db.collection('Users').find({username: username}).toArray();
    }
    catch(e){
        error = e.toString();
    }

    var ret = {results: userResults, error:error};
    res.status(200).json(ret);
})

app.post('/api/login', async (req, res, next) =>
{
    // incoming: username, password
    // outgoing: userInfo, error

    const {username, password} = req.body;

    const db = client.db("oMarketDB");
    const results = await db.collection('Users').find({username: username}).toArray();

    var id = -1;
    var fn = '';
    var ln = '';
    var email = '';
    var userTTL = -1;
    var err = '';
    var phoneNumber = ''
    var aboutMe = '';
    var profilePic = null;
    var interestedIn = [];

    if(results.length !== 0 && results[0].password == password.hashCode())
    {
        id = results[0]._id;
        fn = results[0].firstname;
        ln = results[0].lastname;
        email = results[0].email;
        userTTL = results[0].ttl;
        phoneNumber = results[0].phoneNumber;
        aboutMe = results[0].aboutme;
        profilePic = results[0].profilePic;
        interestedIn = results[0].interestedIn;

        if(userTTL > 0){
            err = 'User is not verified!';
        }
    }
    else
    {
        err = 'No Records Found';
    }

    var ret = { id:id, firstName:fn, lastName:ln, username: username, email: email, phoneNumber: phoneNumber, aboutMe: aboutMe, profilePic: profilePic, ttl: userTTL, interestedIn: interestedIn, error:err};
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
    let profilePic = null;


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
                         profilePic: profilePic,
                         verifyNum: verifyNum,
                         ttl: TTL,
                         interestedIn: interested};

    const results = await db.collection('Users').find({username: username}).toArray();

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

    await sendEmail(email, verifyNum).then(result => console.log('Email sent...', result)).catch(error => console.log(error.message));

    var ret = {_id: newId, firstName: firstname, lastName: lastname, username: username, email: email, phoneNumber: phoneNumber, aboutMe: aboutMe, profilePic: profilePic, ttl: TTL, interestedIn: interested, error: error};
    res.status(200).json(ret);
});

async function sendEmail(email, verifyNum)
{
    let message = 'Here is your verification code: ' + verifyNum;

    try
    {
        const smtpConfig = {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'emailsenderopenmarket@gmail.com',
                pass: pass
            }
        };

        const transport = nodemailer.createTransport(smtpConfig);

        const mailOptions = {
            from: 'Open Market <emailsenderopenmarket@gmail.com>',
            to: email,
            subject: 'Verification Code',
            text: message
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    }
    catch(e)
    {
        return e;
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
    var updatedTTL = -1;

    try{
        var user = await db.collection('Users').findOne({_id: new ObjectId(id)});

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

        user = await db.collection('Users').findOne({_id: new ObjectId(id)});
        updatedTTL = user.ttl;
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = { _id: id, ttl: updatedTTL, error: error};
    res.status(200).json(ret);
});

app.post('/api/editUser', upload.single('image'), async (req, res, next) =>
{
    // incoming: id, newUserInfo
    // outgoing: id, error

    const {id, firstName, lastName, username, password, email, phoneNumber, aboutMe} = req.body;
    console.log(req.body)
    const db = client.db("oMarketDB");

    var newImage = null;
    var oldImage = 0;
    var newUser;
    var ret;

    if (req.file !== undefined)
    {
        newImage = new imageModel({
            name: req.file.filename,
            image: {
                data: fs.readFileSync(path.join(req.file.path)),
                contentType: req.file.mimetype
            }
        });
    }
    else
        oldImage = 1;

    var error = '';

    try{

        if (firstName)
            await db.collection('Users').updateOne({_id: new ObjectId(id)}, {$set: {firstname: firstName}});

        if (lastName)
            await db.collection('Users').updateOne({_id: new ObjectId(id)}, {$set: {lastname: lastName}});

        if (username)
            await db.collection('Users').updateOne({_id: new ObjectId(id)}, {$set: {username: username}});

        if (password)
            await db.collection('Users').updateOne({_id: new ObjectId(id)}, {$set: {password: password.hashCode()}});

        if (email)
            await db.collection('Users').updateOne({_id: new ObjectId(id)}, {$set: {email: email}});

        if (phoneNumber)
            await db.collection('Users').updateOne({_id: new ObjectId(id)}, {$set: {phoneNumber: phoneNumber}});

        if (aboutMe)
            await db.collection('Users').updateOne({_id: new ObjectId(id)}, {$set: {aboutme: aboutMe}});

        if (!oldImage)
            await db.collection('Users').updateOne({_id: new ObjectId(id)}, {$set: {profilePic: newImage}});

        newUser = await db.collection('Users').find({username: username}).toArray();
        if(newUser.length !== 0)
        {
            ret = 
                {   id: newUser[0]._id, 
                    firstName: newUser[0].firstname, 
                    lastName: newUser[0].lastname, 
                    username: username, 
                    email: newUser[0].email, 
                    phoneNumber: newUser[0].phoneNumber, 
                    aboutMe: newUser[0].aboutme, 
                    profilePic: newUser[0].profilePic, 
                    ttl: newUser[0].ttl, 
                    interestedIn: newUser[0].interestedIn
                };  
        }
    }
    catch(e)
    {
        error = e.toString();
    }

    ret = {...ret, error: error};
    res.status(200).json(ret);
});

app.post('/api/createPost', upload.single('image'), async function(req, res, next) {
    //incoming: username, name, condition, genre, price, desc, image
    //outgoing: newPost, error

    const {username, name, genre, price, desc, condition} = req.body;
    const db = client.db("oMarketDB");


    let usersInterested = [];
    var newImage = null;

    if (req.file !== undefined)
    {
        newImage = new imageModel({
            name: req.file.filename,
            image: {
                data: fs.readFileSync(path.join(req.file.path)),
                contentType: req.file.mimetype
            }
        });
    }

    var newPost = {username: username, name: name, genre: genre, price: price, desc: desc, condition: condition, image: newImage, usersInterested: usersInterested};
    const results = await db.collection('Posts').find({username: username, name: name}).toArray();

    var err = '';
    var id = -1;

    try{

        if(results.length > 0){
            throw new Error('Post already exists');
        }

        //Creates new post
        id = (await db.collection('Posts').insertOne(newPost)).insertedId;
    }
    catch(e){
        err = e.toString();
        newPost = '';
    }

    var ret = { _id: id, error: err};
    res.status(200).json(ret);
});

app.post('/api/editPost', upload.single('image'), async(req, res, next) => {

    //incoming: id, username, condition, genre, price, desc, image
    //outgoing: id, error

    var err = '';

    const {id, username, name, genre, price, desc, condition} = req.body;
    const db = client.db("oMarketDB");

    var newImage = null;
    var oldImage = 0;

    if (req.file !== undefined)
    {
        newImage = new imageModel({
            name: req.file.filename,
            image: {
                data: fs.readFileSync(path.join(req.file.path)),
                contentType: req.file.mimetype
            }
        });
    }
    else
        oldImage = 1;


    //just updates all the fields and if they're unchanged they just update from the prev value.
    try{
        if (username)
            await db.collection('Posts').updateOne({_id: new ObjectId(id)}, {$set: {username: username}});

        if (name)
            await db.collection('Posts').updateOne({_id: new ObjectId(id)}, {$set: {name: name}});

        if (genre)
            await db.collection('Posts').updateOne({_id: new ObjectId(id)}, {$set: {genre: genre}});

        if (price)
            await db.collection('Posts').updateOne({_id: new ObjectId(id)}, {$set: {price: price}});

        if (desc)
            await db.collection('Posts').updateOne({_id: new ObjectId(id)}, {$set: {desc: desc}});

        if (condition)
            await db.collection('Posts').updateOne({_id: new ObjectId(id)}, {$set: {condition: condition}});

        if (!oldImage)
            await db.collection('Posts').updateOne({_id: new ObjectId(id)}, {$set: {image: newImage}});
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
        const user = db.collection('Users').updateMany({interestedIn: {$all: [id]}}, {$pull: {interestedIn: id}});
        const post = await db.collection('Posts').findOneAndDelete({_id: new ObjectId(id)});

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

app.post('/api/interestDeletion', async(req, res, next) => {

    //incoming: userId, postId
    //outgoing: error

    var err = '';

    const {userId, postId} = req.body;
    const db = client.db("oMarketDB");


    try {
        const post = db.collection('Posts').updateOne({_id: new ObjectId(postId)}, {$pull: {usersInterested: userId}});
        const user = db.collection('Users').updateOne({_id: new ObjectId(userId)}, {$pull: {interestedIn: postId}});

    }
    catch(e){
        err = e.toString();
    }

    var ret = {error: err};
    res.status(200).json(ret);
});


app.post('/api/getUser', async(req, res, next) => {

    const {userId} = req.body;

    const db = client.db('oMarketDB');
    var user = null;
    var error = '';

    try{
        user = await db.collection('Users').findOne({_id: new ObjectId(userId)});

        if (!user)
            throw new Error('User was not found');
    }
    catch(e){
        error = e.toString();
    }

    var ret;
    
    if(req.body.justUsername){
        ret = {user: user.username, error: error};
    }
    else{
        ret = {user: user, error: error};
    }
    res.status(200).json(ret);
});

app.post('/api/getPost', async(req, res, next) => {

    const {postId} = req.body;

    const db = client.db('oMarketDB');
    var post = null;
    var error = '';

    try{
        post = await db.collection('Posts').findOne({_id: new ObjectId(postId)});

        if (!post)
            throw new Error('Post was not found');
    }
    catch(e){
        error = e.toString();
    }

    var ret = {post: post, error: error};
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
