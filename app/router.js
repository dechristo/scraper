var express = require('express');
var path = require('path');
var router = express.Router();

//home
router.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

//url analysis
router.get('/analize/:url', function (req, res) {
	 res.setHeader('Content-Type', 'application/json');
	 res.send(JSON.stringify({"result":req.params.url}));
});

module.exports = router;