var express = require('express');
var path = require('path');
var router = express.Router();
var pageInfoController = require('./src/controllers/pageInfoController');

//home
router.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

//url analysis
router.get('/analize/:url', pageInfoController.getPageInfo);

module.exports = router;