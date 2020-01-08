var express = require('express')
const app = express();
const bp = require('body-parser');
var csvWriter2 = require('csv-write-stream')
const fs = require('fs');


app.use(bp())

const PORT = 5001;



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


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

app.post('/addpatron', (req, res)=> {
  if (head == false) {
    var writer = csvWriter2({ sendHeaders: false })
  }
  if (head == true) {
    var writer = csvWriter2({ sendHeaders: true })
    head = false
  }
  console.log(`Attempting to post...${req.body}`)
  
  writer.pipe(fs.createWriteStream('patrons.csv', { flags: 'a' }))
  writer.write(req.body)
  writer.end()

  res.send('Patron added');
});

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


app.listen(PORT, ()=>console.log(`CVS writer up at ${PORT}`))