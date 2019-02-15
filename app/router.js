const express = require('express');
const router = express.Router();
const PageInformationController = require('./src/controllers/pageInformationController');

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

router.get('/analize/:url', PageInformationController.getPageInformation);

module.exports = router;
