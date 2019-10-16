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
    {id: 'First', title: 'First'},
    {id: 'Last', title: 'Last'},
    {id: 'Address', title: 'Address'},
    {id: 'City', title: 'City'},
    {id: 'State', title: 'State'},
    {id: 'Zip', title: 'Zip'},
    {id: 'County', title: 'County'},
    {id: 'Phone', title: 'Phone'}      
  ]
})

var head = true;

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(cors());
port = 3000;


//Adds patrons information to the csv file => patrons.csv
app.post('/addpatron', function (req, res) {
  
  //If it is the first json sent after the express server is started the headers will be sent
  if(head == false){
    var writer = csvWriter2({sendHeaders: false})

  }
  if(head == true){
    var writer = csvWriter2({sendHeaders: true})

    head = false

  }

  console.log('Attempting to post...')
  writer.pipe(fs.createWriteStream('patrons.csv', { flags: 'a' }))

  
  writer.write(req.body)
  writer.end()


  res.send('Patron added');
});





const CONNECTION_URL = 'mongodb+srv://Bank:BankInfo_454@persons-1pnrr.mongodb.net/test?retryWrites=true&w=majority';

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

        console.log("Connected to " + DATABASE_NAME);
        //      do your queries on the "collection" object
        collection.find({}).toArray((err, result) => {
            if (err) throw err;
            console.log(`Displaying everything from ${COLLECTION_NAME}`);

            if (result) {
                console.log('Result' + JSON.stringify(result))
                return res.status(200).send(result);
            }
            //client.close();
        })
    })
});



app.delete('/deleteperson/:id', (req, res) => {
  console.log('Trying to delete...')
  MongoClient.connect(CONNECTION_URL, { useUnifiedTopology: true, useNewUrlParser: true }, (error, client) => {
      if (error) throw error;

      database = client.db(DATABASE_NAME);
      //      once you have this object your off to the races
      collection = database.collection(COLLECTION_NAME);

      console.log("Connected to " + DATABASE_NAME);
      
      var idDelete = {_id : ObjectId(req.params.id)}
      collection.deleteOne(idDelete)
          .then(result => console.log(`Deleted ${result.deletedCount} item.`))
          .catch(err => console.error(`Delete failed with error: ${err}`))
      res.send({ message: 'success' })
  })
});



app.listen(port, function () {
  console.log('Server started!');
});