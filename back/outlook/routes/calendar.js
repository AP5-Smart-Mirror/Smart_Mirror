// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

var express = require('express');
var router = express.Router();
var tokens = require('../tokens.js');
var graph = require('../graph.js');

/* GET /calendar */
// <GetRouteSnippet>
router.get('/',
  async function(req, res) {
    if (!req.isAuthenticated()) {
      // Redirect unauthenticated requests to home page
      res.redirect('/')
    } else {
      let params = {
        active: { calendar: true }
      };
      // Get the access token
      var accessToken;
      try {
        accessToken = await tokens.getAccessToken(req); // acces token
      } catch (err) {
        req.flash('error_msg', {
          message: 'Could not get access token. Try signing out and signing in again.',
          debug: JSON.stringify(err)
        });
      }

      if (accessToken && accessToken.length > 0) {
        try {
          // Get the events
          var calendarList = await graph.getCalendars(accessToken)
         var events = new Array();
         for (const calendar of calendarList.value)
         {
          let eventValue;
          eventValue = await graph.getEvents(accessToken,calendar.id);
          events.push(eventValue.value);
         }
          params.events = events.value;
          console.log(test);
         
        } catch (err) {
          req.flash('error_msg', {
            message: 'Could not fetch events',
            debug: JSON.stringify(err)
          });
        }
      } else {
        req.flash('error_msg', 'Could not get an access token');
      }
      res.send(events)
      //res.render('calendar', params);
    }
  }
);
// </GetRouteSnippet>

module.exports = router;