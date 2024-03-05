// Serverving code

// DB

require('dotenv').config();
const url = process.env.MONGODB_URI;
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(url);
client.connect(console.log("mongodb connected"));


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

// From Professor
/*app.post('/api/addcard', async (req, res, next) =>
{
  // incoming: userId, color
  // outgoing: error
  var error = '';
  const { userId, card } = req.body;
  const newCard = {Card:card,UserId:userId};
  
  try
  {
    const db = client.db("COP4331Cards");
    const result = db.collection('Cards').insertOne(newCard);
  }
  catch(e)
  {
    error = e.toString();
  }


  // TEMP FOR LOCAL TESTING.
  cardList.push( card );
  var ret = { error: error };
  res.status(200).json(ret);
});*/

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

app.post('/api/register', async (req, res, next) => 
{
    // incoming: firstname, lastname, username, password, email, phoneNumber
    // outgoing: error

    const db = client.db("oMarketDB");

    var error = '';
    const {firstname, lastname, username, password, email, phoneNumber} = req.body;

    let verified = 0;
    let aboutMe = '';
    const newRegister = {firstname: firstname, lastname: lastname, username: username, password: password.hashCode(), email: email, phoneNumber: phoneNumber, aboutme: aboutMe, verified: verified};

    const results = await db.collection('Users').find({username: username, email: email}).toArray();

    try
    {
        if (results.length != 0)
        {
            throw new Error('User Already Exists');
        }

        const result = db.collection('Users').insertOne(newRegister);
    }
    catch(e)
    {
        error = e.toString();
    }

    var ret = { error: error };
    res.status(200).json(ret);
});

// Example from professor
/*app.post('/api/searchcards', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error
  var error = '';

  const { userId, search } = req.body;
  var _search = search.trim();

  const db = client.db("COP4331Cards");
  const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'i'}}).toArray();

  var _ret = [];

  for( var i=0; i<results.length; i++ )
  {
    _ret.push( results[i].Card );
  }

  var ret = {results:_ret, error:error};
  res.status(200).json(ret);
});

// Server static assets if in production
if (process.env.NODE_ENV === 'production')
{
    // Set static folder
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) =>
    {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}*/

app.listen(PORT, () =>
{
    console.log('Server listening on port ' + PORT);
});