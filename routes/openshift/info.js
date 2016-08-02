var express = require('express');
var router = express.Router();

/* GET info/gen and info/poll for openshift. */
router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-store');
  res.end(JSON.stringify(sysInfo[url.slice(6)]()));
});

module.exports = router;
