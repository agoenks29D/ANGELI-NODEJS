module.exports = function(DataTypes) {
	return {
		fields: {
			id: {
				type: DataTypes.BIGINT.UNSIGNED,
				primaryKey: true,
				autoIncrement: true
			},
			'session-uid': {
				type: DataTypes.UUID,
				unique: true,
				allowNull: false
			},
			connected: {
				type: DataTypes.TIME,
				allowNull: false
			},
			disconnected: {
				type: DataTypes.TIME,
				allowNull: true
			},
			'time-span': {
				type: DataTypes.TIME,
				allowNull: true
			},
			date: {
				type: DataTypes.DATEONLY,
				allowNull: false
			}
		},
		config: {
			timestamps: false
		}
	}
}
