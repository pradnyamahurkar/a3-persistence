// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// our default array of dreams
// const dreams = [
//   "Find and count some sheep",
//   "Climb a really tall mountain",
//   "Wash the dishes"
// ];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/submit", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
  console.log(dreams);
});

// app.post("/add", bodyParser.json(), (request, response) => {
//   dreams.push(request.body.dream);
//   console.log(dreams)
//   response.json(request.body);
// });

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient;
const uri = `mongodb+srv://pdm:${process.env.dbpwd}@cluster0.blnob.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });

let collection = null
client.connect(err => {
  collection = client.db("assignment3").collection("tasks");
  // perform actions on the collection object
});

app.post("/add", bodyParser.json(), function(req, res) {
  console.log("body:", req.body);
  console.log(collection);
  // res.json(req.body);


  // return a promise, it will show the data with the unique id
  collection.insertOne(req.body).then(dbresponse => {
    console.log(dbresponse);
    res.json(dbresponse.ops[0]);
  });
});
