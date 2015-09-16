'use strict';

var express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	expressValidator = require('express-validator'),
	session = require('express-session'),	
	flash = require('connect-flash'),
	MongoStore = require('connect-mongo')(session),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	env = require('./config/env');
	
//mongo/monk/mongoLab
var monk = require('monk'),
	mongoUri = env.mongoUri || '127.0.0.1:27017/MyDatabase',
	db = monk(mongoUri);

//passport
require('./config/passport')(passport,db);

//routes	
var routes = require('./routes/index'),
	users = require('./routes/users');

/*fire up the app*/
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//use expressValidator immediately after bodyParser
app.use(expressValidator());

app.use(cookieParser());

//production mongo
if(process.env.MONGOLAB){
	console.log('on the cloud');
	app.use(session({ 
		resave: true, 
		saveUninitialized: true,
		secret: env.sessionSecret, key: 'sid',
		store: new MongoStore({url:mongoUri})
	}))
}

//local mongo
else{
	app.use(session({ 
		resave: true, 
		saveUninitialized: true,
		secret: env.sessionSecret, key: 'sid'
	}))
}

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//Make our db accessible to our router
app.use( function(req,res,next) {
	req.db = db;
	next();
});

//routes
app.use('/', routes);

//this isn't being used yet, but could be
//app.use('/users', users);

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
