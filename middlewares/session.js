const express_useragent = require('express-useragent');

/**
 * Identify
 *
 * @param      {Object}    req
 * @param      {Object}    res
 * @param      {Function}  next
 */
module.exports.identify = async (req, res, next) => {
	var user = req.session.user_id;
	var guest = req.session.guest_id;
	var visitor = req.session.visitor_id;

	res.locals.current_session = new Object;

	if (typeof user == 'undefined') {
		if (typeof guest == 'undefined') {
			if (typeof visitor == 'undefined') {
				var new_visitor = await Models['session-identifier'].create({
					'referer': req.headers.referer,
					'is-bot': express_useragent.parse(req.headers['user-agent']).isBot,
					'ip-address': req.clientIp,
					'date': moment().format('YYYY-MM-DD'),
					'time': moment().format('HH:mm:ss')
				});

				// set visitor session
				req.session.uid = new_visitor.get('session-uid');
				req.session.visitor_id = new_visitor.get('id');

				// set locals variable
				res.locals.current_session = { id: new_visitor.get('id'), type: 'visitor' };

				// broadcast new visitor
				io.of('/').emit('new_visitor', new_visitor.get('id'));
			} else {
				res.locals.current_session = { id: visitor, type: 'visitor' };
			}
		} else {
			res.locals.current_session = { id: guest, type: 'guest' };
		}
	} else {
		res.locals.current_session = { id: user, type: 'user' };
	}

	next();
}
