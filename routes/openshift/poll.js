var express = require('express');
var router = express.Router();
var sysInfo = require('../../utils/sys-info');

/* GET info/poll for openshift. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-store');
  res.end(JSON.stringify(sysInfo.poll()));
});

module.exports = router;
