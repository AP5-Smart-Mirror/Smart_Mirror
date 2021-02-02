var express = require('express');
var outlook_calendar = require('../components/outlook_calendar.js');
var router = express.Router();

/* GET auth callback. */
router.get('/outlook/calendar',
  function  (req, res, next) {
    res.send(outlook_calendar.getOutlookCalendar());
  }
);


module.exports = router;
