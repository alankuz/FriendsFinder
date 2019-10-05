var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// This starts the server and makes it live 
var app = express();
var PORT = process.env.PORT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use(express.static(path.join(__dirname, './app/public')));
require(path.join(__dirname, './app/routing/apiRoutes'))(app);
require(path.join(__dirname, './app/routing/htmlRoutes'))(app);

app.listen(PORT, function() {
    console.log('Friend Finder is listening on PORT: ' + PORT);
  });