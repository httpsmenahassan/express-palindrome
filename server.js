// got help from Ellie, alum Rio, and Erica on this

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
var db, collection;

// go back and grab your own 
const url = "mongodb+srv://menacingcoder:resilientgirlie2023@week11projects.gej0zkf.mongodb.net/?retryWrites=true&w=majority";

const dbName = "Palindrome";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('words').find().toArray((err, entries) => {
    if (err) return console.log(err)
    console.log(entries)
    res.render('index.ejs', {entries})
  })
})

app.post('/words', (req, res) => {
  console.log('posting')
  const stringInput = req.body.palindrome
  // req.body.palindrome is the path to stringInput aka how we target the input in the HTML
  // inside of every request has a body 
  let result
  console.log(stringInput)

  const isAPalindrome = stringInput.toLowerCase() === stringInput.split('').reverse().join('').toLowerCase()
  
  if (isAPalindrome) {
    result = "yes, it's a palindrome!"
  } else {
    result = "no, it's not a palindrome"
  }

  db.collection('words').insertOne({word: req.body.palindrome, result: result}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.delete('/delete', (req, res) => {
  const id = req.body.id
  // this path is to client JS aka main.js
  console.log(id)
  // when you create something in a mongoDB collection, it automatically creates an identifier for you -- using that ID to grab the object and delete it
  db.collection('words').findOneAndDelete({_id: ObjectId(id)}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
