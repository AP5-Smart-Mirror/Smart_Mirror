var express = require('express');
var bodyParser = require('body-parser');
var register = require('../components/register.js');
var router = express.Router();
var jsonParser = bodyParser.json();

/* POST auth callback. */
router.post('/', jsonParser, async function (req, res, next) {
  res.send(await register.getRegister(req.body));
});

module.exports = router;
