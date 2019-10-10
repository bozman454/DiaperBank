var express = require('express')
const app = express();
var bp = require('body-parser')
var csvWriter2 = require('csv-write-stream')
const fs = require('fs');
const cors = require('cors');

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


app.post('/addpatron', function (req, res) {
  console.log('head: ' + head)
  
  if(head == false){
    var writer = csvWriter2({sendHeaders: false})
    console.log('No headers...')
  }
  if(head == true){
    var writer = csvWriter2({sendHeaders: true})
    console.log('Send headers...')
    head = false
    console.log('head2: ' + head)
  }

  console.log('Attempting to post...')
  console.log('req.body: ' + JSON.stringify(req.body))
  writer.pipe(fs.createWriteStream('patrons.csv', { flags: 'a' }))

  writer.write(req.body)
  writer.end()


  res.send('Patron added');
});

app.listen(port, function () {
  console.log('Server started!');
});