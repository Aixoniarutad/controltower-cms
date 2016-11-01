var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var router = express.Router();
var app = express();
var path = require('path');
var compression = require('compression');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var helmet = require('helmet');
app.use(helmet());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));
app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon('public/images/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '_template')));

// Configuration files
var config = require('./config-'+app.get('env'));

// [START mongo]
var db = mongoose.connection;
	db.on('error', function(err){console.log('connection error:', err)});
	db.on('connected', function(){console.log('connection success:')});
	db.on('disconnected', function(){console.log('connection disconnected:')});
	db.on('open', function(){console.log('connection open:')});
	mongoose.connect(config.get('MONGO_URL'));
// [END mongo]

// [START session]
var sessionConfig = {
	resave: false,
	saveUninitialized: false,
	secret: config.get('SECRET'),
	store: new MongoStore({
		mongooseConnection: mongoose.connection
	})
};
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
require('./_config/passport')(passport);
// [END session]

// [START api]
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/application', require('./routes/application'));
app.use('/media', require('./routes/media'));
app.use('/page', require('./routes/page'));
app.use('/module', require('./routes/module'));
// [END api]

// [START error]
app.use(function(req, res, next){
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});
app.use(function(err, req, res, next){
	res.status(500).send(err.message);
});
// [END error]

module.exports = app;