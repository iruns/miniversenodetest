var express = require('express');
var router = express.Router();

/* GET health for openshift. */
router.get('/', function(req, res, next) {
  res.writeHead(200);
  res.end();
});

module.exports = router;
