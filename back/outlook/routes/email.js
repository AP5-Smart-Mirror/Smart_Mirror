var express = require('express');
var router = express.Router();
var tokens = require('../tokens.js');
var graph = require('../graph.js');

/* GET /messages */
// <GetRouteSnippet>

router.get('/',
  async function(req, res) {
    console.log("test")
    if (!req.isAuthenticated()) {
      console.log("tata")
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
        //ssconsole.log(TATO);
          try {
            console.log("TATA");
            var emailList = await graph.getMessages(accessToken);
            var messages = new Array();
            for (const email of emailList.value)
              {
              let eventValue;
              eventValue = await graph.getEmails(accessToken,email.id);
              console.log(email.id);
              messages.push(emailList.value);
               }
            
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