var express = require('express');
var addWidget = require('../components/addWidget');
var deleteWidget = require('../components/deleteWidget');
var addUserWidget = require('../components/addProfileWidget');
var deleteUserWidget = require('../components/deleteProfileWidget');
var getWidgets = require('../components/getWidgets');
var router = express.Router();


/* GET account. */
router.get('/', async function (req, res, next) {
  res.send(await getWidgets.getWidgets(req.body));
});

/* POST auth callback. */
router.post('/add', async function (req, res, next) {
  res.send(await addWidget.getAdd(req.body));
});

router.post('/addProfileWidget', async function (req, res, next) {
  res.send(await addUserWidget.addUserWidget(req.body));
});

/* POST auth callback. */
router.post('/delete', async function (req, res, next) {
  res.send(await deleteWidget.getDelete(req.body));
});

router.post('/deleteProfileWidget', async function (req, res, next) {
  res.send(await deleteUserWidget.deleteUserWidget(req.body));
});

module.exports = router;
