const express = require('express');
const router = express.Router();
const pageInfoController = require('./src/controllers/pageInfoController');

//home
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

//url analysis
router.get('/analize/:url', (req, res) => {
    const url = req.params.url;    
    let info = pageInfoController.getPageInfo(url);
    res.setHeader('Content-Type', 'application/json; charset=UTF-8');
    res.status(200).json(info);
});
module.exports = router;
