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

// For rendering page
//const path = require('path');
//var index = require('./routes/index.js');
//app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views'));

app.get('/',function(req,res) {
    res.send("Hello World!");
    //res.sendFile(path.join(__dirname+'/Home.html'));
    //res.render('Home.html');
});

//Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
});

