var express = require('express');
var router = express.Router();

/* GET stuff for openshift. */
router.get('/health', function(req, res, next) {
  res.writeHead(200);
  res.end();
});

router.get('/info/gen', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-store');
  res.end(JSON.stringify(sysInfo[url.slice(6)]()));
});

router.get('/info/poll', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-store');
  res.end(JSON.stringify(sysInfo[url.slice(6)]()));
});

module.exports = router;
