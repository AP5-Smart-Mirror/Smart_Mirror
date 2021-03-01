var express = require('express');
var addWidget = require('../components/addWidget');
var deleteWidget = require('../components/deleteWidget');
var addUserWidget = require('../components/addProfileWidget');
var deleteUserWidget = require('../components/deleteProfileWidget');
var listWidget = require('../components/listWidget');
var router = express.Router();

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

router.post('/listWidget', async function (req, res, next) {
  res.send(await listWidget.getList(req.body));
});

module.exports = router;
