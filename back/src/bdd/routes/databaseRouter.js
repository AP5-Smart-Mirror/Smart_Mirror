var express = require('express');
var accountRouter = require('../Account/routes/accountRouter');
var router = express.Router();

router.use('/account', accountRouter);

module.exports = router;
