//Set up express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');                                     
app.use(bodyParser.json());   
app.use(bodyParser.urlencoded({ extended: true }));

// Database setup
require('./models/db.js');
// Routes setup
var routes = require('./routes/routes.js');
app.use('/', routes);

app.get('/',function(req,res) {
    res.send("Hello World!");
});

//app.post     [new]
//app.post(id) [update]
//app.delete   [delete]
//Start the server
app.listen(3000,function(req,res) {
    console.log('Express listening on port 3000');
});
