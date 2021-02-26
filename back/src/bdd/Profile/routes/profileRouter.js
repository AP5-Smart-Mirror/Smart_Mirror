var express = require('express');
var login = require('../components/login');
var register = require('../components/register');
var getProfiles = require('../components/getProfiles');
var router = express.Router();

/* GET profiles list from an account. */
router.get('/', async function (req, res, next) {
  res.send(await getProfiles.getProfiles(req.body));
});

/* POST auth callback. */
router.post('/login', async function (req, res, next) {
  res.send(await login.getLogin(req.body));
});

/* POST auth callback. */
router.post('/register', async function (req, res, next) {
  res.send(await register.getRegister(req.body));
});

module.exports = router;
