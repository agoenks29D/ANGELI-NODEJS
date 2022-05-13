io.of('/').on('connection', (socket) => {
	const auth_session = socket.handshake.auth.session;
	if (socket.handshake.auth.session !== undefined) {
		Models.online.findOne({
			where: {
				'session-uid': auth_session
			}
		}).then(async online => {
			if (online == null) {
				Models.online.create({ 'session-uid': auth_session }).then(async () => {
					var count = await Models.online.count();
					io.of('/').emit('online_visitor', count);
				});
			} else {
				online.count = online.get('count') + 1;
				online.save();
			}
		});
	}

	socket.on('disconnect', () => {
		Models.online.findOne({ where: { 'session-uid': auth_session } }).then(async online => {
			if (online !== null) {
				if ((online.get('count') - 1) == 0) {
					online.destroy().then(async () => {
						var count = await Models.online.count();
						io.of('/').emit('online_visitor', count);
					})
				} else {
					online.count = (online.get('count') - 1);
					await online.save();
				}
			}
		});
	});
});
