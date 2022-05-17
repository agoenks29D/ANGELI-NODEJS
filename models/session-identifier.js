module.exports = function(DataTypes) {
	return {
		fields: {
			id: {
				type: DataTypes.BIGINT.UNSIGNED,
				primaryKey: true,
				autoIncrement: true
			},
			'uid' : {
				type: DataTypes.UUID,
				unique: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4
			},
			'is-bot': {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			'logged-in': {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			'user-id': {
				type: DataTypes.BIGINT.UNSIGNED,
				allowNull: true
			},
			'ip-address': {
				type: DataTypes.CHAR(15),
				allowNull: false
			},
			country: {
				type: DataTypes.STRING(40),
				allowNull: true
			},
			region: {
				type: DataTypes.STRING(40),
				allowNull: true
			},
			city: {
				type: DataTypes.STRING(40),
				allowNull: true
			},
			referer: {
				type: DataTypes.STRING,
				allowNull: true
			},
			'referer-domain': {
				type: DataTypes.STRING,
				allowNull: true
			},
			'device-type': {
				type: DataTypes.ENUM('desktop','laptop','tablet','mobile','smart-tv'),
				allowNull: true
			},
			'os-type': {
				type: DataTypes.STRING(20),
				allowNull: true
			},
			'os-name': {
				type: DataTypes.STRING(20),
				allowNull: true
			},
			'os-version': {
				type: DataTypes.STRING(20),
				allowNull: true
			},
			date: {
				type: DataTypes.DATEONLY,
				allowNull: false
			},
			time: {
				type: DataTypes.TIME,
				allowNull: false
			}
		},
		associate: [
			{ type: 'belongsTo', model: 'user', foreignKey: 'user-id' },
			{ type: 'hasOne', model: 'identified-device', foreignKey: 'session-identifier-id' },
			{ type: 'hasOne', model: 'identified-browser', foreignKey: 'session-identifier-id' }
		],
		config: {
			timestamps: false
		}
	}
}
