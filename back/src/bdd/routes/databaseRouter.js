var express = require('express');
var accountRouter = require('../Account/routes/accountRouter');
var profileRouter = require('../Profile/routes/profileRouter');
var router = express.Router();

router.use('/account', accountRouter);
router.use('/profile', profileRouter);
module.exports = router;
