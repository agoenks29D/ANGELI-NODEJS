io.of('/').on('connection', (socket) => {
	const auth_session = socket.handshake.auth.session;
	if (auth_session !== undefined) {
		Models.online.findOne({
			where: {
				'session-uid': auth_session
			}
		}).then(async online => {
			if (online == null) {
				Models['session-identifier'].findOne({
					where: {
						'uid': auth_session
					}
				}).then(session_identifier => {
					let logged_in = false;
					if (session_identifier !== null) {
						logged_in = session_identifier.get('logged-in');
					}

					Models.online.create({ 'session-uid': auth_session, 'logged-in': logged_in }).then(async () => {
						io.of('/').emit('online_user', await Models.online.count({ where: { 'logged-in': true } }));
						io.of('/').emit('online_visitor', await Models.online.count({ where: { 'logged-in': false } }));
						io.of('/user').to('admin').emit('online_status', {
							status: 'online',
							session: auth_session
						});
					});

					socket.join(auth_session);
				});
			} else {
				online.count = online.get('count') + 1;
				online.save();
			}
		});
	}

	socket.on('disconnect', () => {
		if (auth_session !== undefined) {
			Models.online.findOne({ where: { 'session-uid': auth_session } }).then(async online => {
				if (online !== null) {
					if ((online.get('count') - 1) == 0) {
						online.destroy().then(async () => {
							io.of('/').emit('online_user', await Models.online.count({ where: { 'logged-in': true } }));
							io.of('/').emit('online_visitor', await Models.online.count({ where: { 'logged-in': false } }));
							io.of('/user').to('admin').emit('online_status', {
								status: 'offline',
								session: auth_session
							});
						})
					} else {
						online.count = (online.get('count') - 1);
						await online.save();
					}
				}
			});
		}
	});
});
