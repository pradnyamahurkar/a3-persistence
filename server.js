// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// let dataSet = []

// our default array of dreams
const tasks = [
  {
    yourtask: "Find and count some sheep",
    date: "23/1/2002",
    priority: "High",
    advice: "Do it ASAP"
  },
  {
    yourtask: "Climb a really tall mountain",
    date: "23/1/2005",
    priority: "Low",
    advice: "Chill"
  },
  {
    yourtask: "Wash the dishes",
    date: "23/1/2005",
    priority: "Low",
    advice: "Chill"
  }
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/task", (request, response) => {
  // express helps us take JS objects and send them as JSON
  // response.json(tasks);
  // console.log(request.body)
  console.log(tasks);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

app.post("/add", (request, response) => {
  // tasks.push(request.body.dream);
  console.log("Please appear");
  console.log("Please appear:" + tasks);
  // response.json(request.body);
});

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const uri = `mongodb+srv://pdm:${process.env.dbpwd}@cluster0.blnob.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });

let collection = null;
client.connect(err => {
  collection = client.db("assignment3").collection("tasks");
  // perform actions on the collection object
});

// app.post("/submit", bodyParser.json(), function(request, response) {
//   tasks.push(request.body)
//   console.log("body:", request.body);
//   // console.log(collection);
//   // res.json(req.body);

//   // return a promise, it will show the data with the unique id
//   // collection.insertOne(req.body).then(dbresponse => {
//   //   console.log(dbresponse);
//   //   res.json(dbresponse.ops[0]);
//   // });
// });
