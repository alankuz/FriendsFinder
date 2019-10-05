var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var PORT = 8080;
// var PORT = process.env.PORT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use(express.static(path.join(__dirname, './app/public')));
require(path.join(__dirname, './app/routing/apiRoutes'))(app);
require(path.join(__dirname, './app/routing/htmlRoutes'))(app);

app.listen(PORT, function() {
    console.log('Friend Finder app is listening on PORT: ' + PORT);
  });