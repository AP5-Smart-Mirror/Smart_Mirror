var express = require('express');
var gCal = require('../components/google_calendar.js');
var gMail = require('../components/google_mail.js');
var router = express.Router();

/* GET auth callback. */
router.get('/calendar', function (req, res, next) {
  res.send(gCal.getCalendar());
});

router.get('/mails', function (req, res, next) {
  res.send(gMail.getMail());
});

module.exports = router;
