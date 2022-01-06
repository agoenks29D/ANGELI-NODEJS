require('dotenv').config();

const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cookie_parser  = require('cookie-parser');
const express_session = require('express-session');
const session = express_session({
	secret: process.env.ENCRYPTION_KEY,
	resave: true,
	saveUninitialized: true,
	cookie: { secure: false, maxAge: Date.now() + (30 * 86400 * 1000) }
});
const request_ip = require('request-ip');
const http_errors = require('http-errors');
const cors = require('cors');
const compression = require('compression');

/**
 * API setup
 */
app.set('trust proxy', 1);

/**
 * Global middleware
 */
app.use(
	session,
	express.json(),
	express.urlencoded({ extended: true }),
	request_ip.mw(),
	cookie_parser(process.env.ENCRYPTION_KEY),
	cors({ origin : (origin, callback) => { callback(null, true) }, credentials: true }),
	compression(),
	(req, res, next) => {
		// Custom middleware...
		next();
});

/**
 * API Routing V1
 */
app.use('/v1', (req, res, next) => {
	next();
},
	express.Router().use('/', require(__dirname+'/routes/v1/index')),
	express.Router().use('/user', require(__dirname+'/routes/v1/user'))
);

/**
 * Error handling
 */
app.use((req, res, next) => next(http_errors(404)), (error, req, res, next) => {
	error_status = error.status || 500;
	error_message = error.message;
	res.status(error_status);
	res.json({ status: 'error', code: error_status, message: error_message });
});

/**
 * On listening event
 */
http.on('listening', () => {
	var addr = http.address();
	var bind = typeof addr === 'string'
	? 'pipe ' + addr
	: 'port ' + addr.port;
	console.log('server listening on port '+addr.port);
});

/**
 * On error event
 */
http.on('error', (error) => console.log('application error', error));

/**
 * Start listen on port
 */
http.listen(process.env.PORT || 8080);
