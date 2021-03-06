require('dotenv').config();

const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const uuid = require('uuid');
const http = require('http').createServer(app);
const async = require('async');
const cookie_parser  = require('cookie-parser');
const express_session = require('express-session');
const express_socketio_session = require('express-socket.io-session');
const SessionFileStore = require('session-file-store')(express_session);
const session = express_session({
	store: new SessionFileStore(),
	secret: process.env.ENCRYPTION_KEY,
	resave: true,
	saveUninitialized: true,
	cookie: { secure: false, maxAge: Date.now() + (30 * 86400 * 1000) }
});
const request_ip = require('request-ip');
const http_errors = require('http-errors');
const cors = require('cors');
const compression = require('compression');
const io = require('socket.io')(http, {
	path: '/ws',
	credentials: true,
	allowRequest: (req, callback) => callback(null, true)
});
const moment_timezone = require('moment-timezone');
const moment_duration = require('moment-duration-format');

global.io = io;
global.DB;
global.Models;
global.Joi = require('joi');
global.moment = require('moment');
global.webpush = require('web-push');
global.cronjob = require('node-cron');
global.CryptoJS = require('crypto-js');
global.Middlewares = require(__dirname+'/middlewares');

io.engine.generateId = () => uuid.v4();

async.waterfall([
	// Initialize database using sequelize
	function(callback) {
		const Sequelize = require('./libraries/Sequelize');
		Sequelize.then(DB_Connection => callback(null, DB_Connection), error => callback(error));
	}
], function(error, result) {
	if (!error) {

		DB = result;

		Models.online.destroy({ truncate: true });
		Models.user.count().then(async length => {
			if (length < 1) {
				if (await Models.role.count() < 1) {
					var role = await Models.role.create({
						uid: 'admin',
						name: 'ADMIN',
						description: 'The administrator',
						status: 'active'
					});
				} else {
					var role = await Models.role.findOne();
				}

				const sha1 = require('crypto-js/sha1');
				await Models.user.create({ 'role-id': role.id, 'full-name': 'ADMINISTRATOR', username: 'admin', password: sha1('admin').toString() });
			}
		});

		moment.tz.setDefault(process.env.TIMEZONE || 'Asia/Jakarta');
		webpush.setVapidDetails('mailto:'+process.env.DEVELOPER_EMAIL, process.env.publicVapidKey, process.env.privateVapidKey);

		var websockets = require(__dirname+'/websockets');
		Object.keys(websockets).forEach((namespace) => {
			if (namespace == 'root') {
				namespace = '/';
			}

			io.of(namespace).use(express_socketio_session(session, { autoSave: true }));
		});

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

		app.use(Middlewares.session.identify);

		app.get('/', (req, res) => {
			res.sendFile(path.join(__dirname, '/index.html'));
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
	} else {
		console.log(error);
	}
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
