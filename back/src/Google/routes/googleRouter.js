var express = require('express');
var gCal = require('../components/google_calendar.js');
var router = express.Router();

/* GET auth callback. */
router.get('/calendar', function (req, res, next) {
  res.send(gCal.getCalendar());
});

module.exports = router;
