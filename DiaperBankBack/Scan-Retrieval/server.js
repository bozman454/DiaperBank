var express = require('express')
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require('mongodb').ObjectID;

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const CONNECTION_URL = 'mongodb+srv://Bank:willem@persons-1pnrr.mongodb.net/test?retryWrites=true&w=majority';
const DATABASE_NAME = "People";
const COLLECTION_NAME = "Info";
const PORT = 5000;


app.get('/preregistered', (req, res) => {
  MongoClient.connect(CONNECTION_URL, { useUnifiedTopology: true, useNewUrlParser: true }, (error, client) => {
    if (error) throw error;
    database = client.db(DATABASE_NAME);
    collection = database.collection(COLLECTION_NAME);
    console.log("Connected to " + DATABASE_NAME + ' ');
    collection.find({}).toArray((err, result) => {
      if (err) throw err;
      console.log(`Displaying everything from ${COLLECTION_NAME}`);
      if (result)
        res.status(200).send(result);

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
      console.log('County CSV file successfully processed');
      // console.log('Express County: ' + county)
      res.status(200).send({ county })
    });


})

app.delete('/deleteperson/:id', (req, res) => {
  console.log('Trying to delete from database...')
  MongoClient.connect(CONNECTION_URL, { useUnifiedTopology: true, useNewUrlParser: true }, (error, client) => {
    if (error) throw error;

    database = client.db(DATABASE_NAME);
    //      once you have this object your off to the races
    collection = database.collection(COLLECTION_NAME);

    console.log("Connected to " + DATABASE_NAME + ' ');

    var idDelete = { _id: ObjectId(req.params.id) }
    collection.deleteOne(idDelete)
      .then(result => console.log(`Deleted ${result.deletedCount} item.`))
      .catch(err => console.error(`Delete failed with error: ${err}`))
    res.send({ message: 'success' })
  })
});



app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

