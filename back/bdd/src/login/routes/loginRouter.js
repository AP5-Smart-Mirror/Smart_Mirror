var express = require('express');
var login = require('../components/login.js');
var router = express.Router();

/* POST auth callback. */
router.post('/', async function (req, res, next) {
  res.send(await login.getLogin(req.body));
});

module.exports = router;
