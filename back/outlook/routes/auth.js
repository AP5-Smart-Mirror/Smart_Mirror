// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET auth callback. */
router.get('/signin',
  function  (req, res) {
    passport.authenticate('azuread-openidconnect',
      {
        response: res,
        prompt: 'login',
        failureRedirect: '/outlook',
        failureFlash: true,
        successRedirect: '/outlook'
      }
    )(req,res);
  }
);

router.post('/callback',
  function(req, res) {
    passport.authenticate('azuread-openidconnect',
      {
        response: res,
        failureRedirect: '/outlook',
        failureFlash: true,
        successRedirect: '/outlook'
      }
    )(req,res);
  }
);


module.exports = router;
