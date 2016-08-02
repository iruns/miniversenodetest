// This is a copy of express' default project's app.js

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require( path.resolve( __dirname, "./index.js" ) );
var users = require( path.resolve( __dirname, "./users.js" ) );

// openshift stuff
var health = require( path.resolve( __dirname, "./openshift/health.js" ) );
var gen = require( path.resolve( __dirname, "./openshift/gen.js" ) );
var poll = require( path.resolve( __dirname, "./openshift/poll.js" ) );

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('views', './views');
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// openshift stuff
app.use('/health', health);
app.use('/info/gen', gen);
app.use('/info/poll', poll);

app.use(function (req, res) {
  var url = req.url;
  if (url == '/') {
    url += 'index.html';
  }

  // IMPORTANT: Your application HAS to respond to GET /health with status 200
  //            for OpenShift health monitoring

  if (url == '/health') {
    res.writeHead(200);
    res.end();
  }
  else if (url == '/info/gen' || url == '/info/poll') {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.end(JSON.stringify(sysInfo[url.slice(6)]()));
  }
  // else {
    // fs.readFile('./static' + url, function (err, data) {
    //   if (err) {
    //     res.writeHead(404);
    //     res.end('Not found');
    //   } else {
    //     let ext = path.extname(url).slice(1);
    //     res.setHeader('Content-Type', contentTypes[ext]);
    //     if (ext === 'html') {
    //       res.setHeader('Cache-Control', 'no-cache, no-store');
    //     }
    //     res.end(data);
    //   }
    // });
  // }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
