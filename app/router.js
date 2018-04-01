const express = require('express');
const router = express.Router();
const pageInfoController = require('./src/controllers/pageInfoController');

//home
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

//url analysis
router.get('/analize/:url', pageInfoController.getPageInfo);

module.exports = router;
