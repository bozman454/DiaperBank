var express = require('express')
const app = express();
var bp = require('body-parser')
var csvWriter2 = require('csv-write-stream')
const fs = require('fs');
const cors = require('cors');

const MongoClient = require("mongodb").MongoClient;
const bodyParser = require('body-parser')
const ObjectId = require('mongodb').ObjectID;
const _ = require('underscore')



const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'patrons.csv',
  header: [
    { id: 'First', title: 'First' },
    { id: 'Last', title: 'Last' },
    { id: 'DOB', title: 'Date of Birth' },
    { id: 'Address', title: 'Address' },
    { id: 'City', title: 'City' },
    { id: 'State', title: 'State' },
    { id: 'Zip', title: 'Zip' },
    { id: 'County', title: 'County' },
    { id: 'Phone', title: 'Phone' }
  ]
})

var head = true;

port = 3000;


//Adds patrons information to the csv file => patrons.csv
app.post('/addpatron', function (req, res) {

  //If it is the first json sent after the express server is started the headers will be sent
  if (head == false) {
    var writer = csvWriter2({ sendHeaders: false })

  }
  if (head == true) {
    var writer = csvWriter2({ sendHeaders: true })

    head = false

  }

  console.log('Attempting to post...' + ' ' + Dater)
  writer.pipe(fs.createWriteStream('patrons.csv', { flags: 'a' }))


  writer.write(req.body)
  writer.end()

  res.send('Patron added');
});


var csv = require('csv-stream');
var request = require('request');

app.get('/getcounty/:zip', function (req, res) {
  var county = '';
  const csv = require('csv-parser');
  const fs = require('fs');
  console.log('Getting county...')
  fs.createReadStream('uscities.csv')
    .pipe(csv())
    .on('data', (row) => {
      if (row.zips.includes(req.params.zip)) {
        console.log(row)
        console.log(row.county_name)
        if (county == '') {
          county = row.county_name;
        }
      }
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      // console.log('Express County: ' + county)
      res.status(200).send({ county })
    });


})




// app.get('/getcounty/:zip', function(req, res){
//   const YOUR_API_KEY = '';
//   var zipApi = 'https://maps.googleapis.com/maps/api/geocode/json?postal_code=' + req.params.zip + '&key='+YOUR_API_KEY
//   app.get(zipApi, function(req,res){

//   })


// })




Dater = () => {
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return ` -  ${today} @ ${time}`
}

const CONNECTION_URL = 'mongodb+srv://Bank:willem@persons-1pnrr.mongodb.net/test?retryWrites=true&w=majority';

//enter database name here
const DATABASE_NAME = "People";

const COLLECTION_NAME = "Info";


var corsOptions = {
  origin: 'http://localhost:3000',
  optionsCuccessStatus: 200
}

patrons = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/preregistered', (req, res) => {
  //                                          These two parameters supress warnings
  MongoClient.connect(CONNECTION_URL, { useUnifiedTopology: true, useNewUrlParser: true }, (error, client) => {
    if (error) throw error;

    database = client.db(DATABASE_NAME);
    //      once you have this object your off to the races
    collection = database.collection(COLLECTION_NAME);

    console.log("Connected to " + DATABASE_NAME + ' ' + Dater);
    //      do your queries on the "collection" object
    collection.find({}).toArray((err, result) => {
      if (err) throw err;
      console.log(`Displaying everything from ${COLLECTION_NAME}` + ' ' + Dater);

      if (result) {
        // console.log('Result' + JSON.stringify(result) + ' ' + Dater)
        return res.status(200).send(result);
      }
      //client.close();
    })
  })
});

app.get('/deletedata', (req, res) => {
  MongoClient.connect(CONNECTION_URL, { useUnifiedTopology: true, useNewUrlParser: true }, (error, client) => {
    if (error) throw error;

    database = client.db(DATABASE_NAME);
    //      once you have this object your off to the races
    collection = database.collection(COLLECTION_NAME);

    console.log("Connected to " + DATABASE_NAME);


    collection.remove({})
      .then(result => console.log(`Deleted everything `))
      .catch(err => console.error(`Delete failed with error: ${err}`))
    res.send({ message: 'success' })
  })
})


app.delete('/deleteperson/:id', (req, res) => {
  console.log('Trying to delete from database...' + ' ' + Dater)
  MongoClient.connect(CONNECTION_URL, { useUnifiedTopology: true, useNewUrlParser: true }, (error, client) => {
    if (error) throw error;

    database = client.db(DATABASE_NAME);
    //      once you have this object your off to the races
    collection = database.collection(COLLECTION_NAME);

    console.log("Connected to " + DATABASE_NAME + ' ' + Dater);

    var idDelete = { _id: ObjectId(req.params.id) }
    collection.deleteOne(idDelete)
      .then(result => console.log(`Deleted ${result.deletedCount} item.` + ' ' + Dater))
      .catch(err => console.error(`Delete failed with error: ${err}` + ' ' + Dater))
    res.send({ message: 'success' })
  })
});



app.listen(port, function () {
  console.log('Server started!' + Dater());
});







//const setupMiddleware async () => {}

// const init () async => {

//   const setupMiddleware(application, req);

//   const setupFilesystem(application)

// }

// const service () => {


//   const application = {};

//   application.config = require('./config')

//   application.logger = log4js;
//   applicatiom.endpoints = express();

//   return {
//     init: init();
//   }
// }

// module.exports = service;