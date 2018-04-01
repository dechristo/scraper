var express = require('express');
var morgan = require('morgan');
var router = require('./router');
var http = require ('http');

var app = express();

app.use(morgan(':method :url :status :response-time ms'));
app.use(express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/../node_modules'));
app.use('/scrap', router);

app.listen(2000, function() {
	console.log("Server started on port 2000.");
});

module.exports = app;