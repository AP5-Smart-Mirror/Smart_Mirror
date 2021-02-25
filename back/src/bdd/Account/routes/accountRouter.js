var express = require('express');
var login = require('../login/login');
var register = require('../register/register');
var router = express.Router();

/* POST auth callback. */
router.post('/login', async function (req, res, next) {
  res.send(await login.getLogin(req.body));
});

/* POST auth callback. */
router.post('/register', async function (req, res, next) {
  res.send(await register.getRegister(req.body));
});

module.exports = router;
