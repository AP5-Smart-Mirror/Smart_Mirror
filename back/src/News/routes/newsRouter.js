var express = require('express');
var news = require('../components/news.js');
var router = express.Router();

/* GET auth callback. */
router.get('/', async function (req, res, next) {
  res.send(await news.getNews());
});

module.exports = router;
