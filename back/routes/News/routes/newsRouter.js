var express = require('express');
var news = require('../components/clock.js');
var router = express.Router();

/* GET auth callback. */
router.get('/news',
  function  (req, res, next) {
    res.send(news.getNews());
  }
);


module.exports = router;
