module.exports = function(DataTypes) {
	return {
		fields: {
			id: {
				type: DataTypes.BIGINT.UNSIGNED,
				primaryKey: true,
				autoIncrement: true
			},
			'sha1-uid': {
				type: DataTypes.CHAR(40),
				allowNull: false
			},
			'device-id': {
				type: DataTypes.BIGINT.UNSIGNED,
				allowNull: false
			},
			'public-key': {
				type: DataTypes.STRING,
				allowNull: false
			},
			'private-key': {
				type: DataTypes.STRING,
				allowNull: true
			},
			endpoint: {
				type: DataTypes.TEXT('tiny'),
				allowNull: false
			},
			status: {
				type: DataTypes.ENUM('active', 'non-active', 'expired'),
				allowNull: false,
				defaultValue: 'active'
			}
		},
		associate: [
			{ type: 'belongsTo', model: 'identified-device', foreignKey: 'device-id', targetKey: 'id' }
		],
		config: {
			updatedAt: false
		}
	}
}
