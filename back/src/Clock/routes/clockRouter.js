var express = require('express');
var clock = require('../components/clock.js');
var router = express.Router();

/* GET auth callback. */
router.get('/', function (req, res, next) {
  res.send(clock.getClock());
});

module.exports = router;
