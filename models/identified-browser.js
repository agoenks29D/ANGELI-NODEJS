module.exports = function(DataTypes) {
	return {
		fields: {
			id: {
				type: DataTypes.BIGINT.UNSIGNED,
				primaryKey: true,
				autoIncrement: true
			},
			'session-identifier-id' : {
				type: DataTypes.BIGINT.UNSIGNED,
				allowNull: false
			},
			'device-id': {
				type: DataTypes.BIGINT.UNSIGNED,
				allowNull: false
			},
			uid: {
				type: DataTypes.STRING(40),
				allowNull: false
			},
			name: {
				type: DataTypes.STRING(40),
				allowNull: false
			},
			version: {
				type: DataTypes.STRING(20),
				allowNull: false
			}
		},
		associate: [
			{ type: 'belongsTo', model: 'session-identifier', foreignKey: 'session-identifier-id', targetKey: 'id' },
			{ type: 'belongsTo', model: 'identified-device', foreignKey: 'device-id', targetKey: 'id' }
		]
	}
}
