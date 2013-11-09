
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');


var app = express();

// Set environment.
if(process.env.OPENSHIFT_NODEJS_IP) app.set('env', 'production');

// all environments
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Middleware.
app.use(function(req, res, next) {
    res.locals.env = app.get('env');
    next();
});

app.use(express.favicon(path.join(__dirname, 'public/img/favicon.ico')));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Development only.
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Routing.
app.get('/', routes.get);
app.post('/', routes.post);

// Server.
http.createServer(app).listen(app.get('port'), app.get('ip'), function(){
  console.log('Express server listening on ' + app.get('ip') + ":" + app.get('port'));
  console.log("env: " + app.get('env'));
});
