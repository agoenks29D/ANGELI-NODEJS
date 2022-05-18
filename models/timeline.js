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
				unique: false,
				allowNull: false
			},
			arguments: {
				type: DataTypes.TEXT,
				allowNull: true
			},
			activity_code: {
				type: DataTypes.STRING,
				allowNull: false
			},
			activity_text: {
				type: DataTypes.STRING,
				allowNull: true
			},
			module: {
				type: DataTypes.STRING,
				allowNull: true
			},
			'data-id': {
				type: DataTypes.STRING,
				allowNull: true
			},
			'user-id': {
				type: DataTypes.BIGINT.UNSIGNED,
				allowNull: false
			}
		},
		associate: [
			{ type: 'belongsTo', model: 'session-identifier', foreignKey: 'session-uid', targetKey: 'uid' },
			{ type: 'belongsTo', model: 'user', foreignKey: 'user-id' },
		],
		config: {
			updatedAt: false
		}
	}
}
