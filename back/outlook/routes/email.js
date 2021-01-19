var express = require('express');
var router = express.Router();
var tokens = require('../tokens.js');
var graph = require('../graph.js');

/* GET /messages */
// <GetRouteSnippet>

router.get('/',
  async function(req, res) {
    if (!req.isAuthenticated()) {
      // Redirect unauthenticated requests to home page
      res.redirect('/')
    } else {
      let params = {
        active: { inbox : true } 
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
            var emailList = await graph.getEmails(accessToken);
            var messages = new Array();
            messages.push(emailList.value);
            params.emailList = messages.value;

          } catch (err) {
            req.flash('error_msg', {
                message: 'Could not fetch messages',
                debug: JSON.stringify(err)
              });
          }
      } else {
        req.flash('error_msg', 'Could not get an access token');
      }
      res.send(messages);
    }
  }
);

module.exports = router;