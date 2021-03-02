var express = require('express');
var accountRouter = require('../Account/routes/accountRouter');
var profileRouter = require('../Profile/routes/profileRouter');
var widgetRouter = require('../Widget/routes/widgetRouter');
var router = express.Router();

router.use('/account', accountRouter);
router.use('/profile', profileRouter);
router.use('/widget', widgetRouter);
module.exports = router;
