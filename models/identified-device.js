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
			uid: {
				type: DataTypes.CHAR(40),
				allowNull: false
			},
			type: {
				type: DataTypes.ENUM('tv', 'desktop', 'laptop', 'tablet', 'mobile', 'wear'),
				allowNull: true
			},
			'is-browser': {
				type: DataTypes.BOOLEAN,
				allowNull: false
			},
			'os-name': {
				type: DataTypes.STRING(20),
				allowNull: true,
				defaultValue: false
			},
			'os-version': {
				type: DataTypes.STRING(20),
				allowNull: true
			}
		},
		associate: [
			{ type: 'belongsTo', model: 'session-identifier', foreignKey: 'session-identifier-id', targetKey: 'id' },
			{ type: 'hasMany', model: 'identified-browser', foreignKey: 'device-id' },
		]
	}
}
