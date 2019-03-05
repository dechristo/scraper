const express = require('express');
const router = express.Router();
const PageInformationController = require('./src/controllers/pageInformationController');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/web/scraper/src/index.html'));
});

router.get('/analize/:url', PageInformationController.getPageInformation);

module.exports = router;
