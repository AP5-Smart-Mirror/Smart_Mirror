var express = require('express');
var addWidget = require('../components/addWidget');
var deleteWidget = require('../components/deleteWidget');
var router = express.Router();

/* POST auth callback. */
router.post('/add', async function (req, res, next) {
  res.send(await addWidget.getAdd(req.body));
});

/* POST auth callback. */
router.post('/delete', async function (req, res, next) {
  res.send(await deleteWidget.getDelete(req.body));
});

module.exports = router;
