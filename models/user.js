module.exports = function(DataTypes) {
	return {
		fields: {
			id: {
				type: DataTypes.BIGINT.UNSIGNED,
				primaryKey: true,
				autoIncrement: true
			},
			'role-id': {
				type: DataTypes.BIGINT.UNSIGNED,
				allowNull: false
			},
			email: {
				type: DataTypes.STRING(40),
				allowNull: true
			},
			username: {
				type: DataTypes.STRING(16),
				allowNull: true
			},
			password: {
				type: DataTypes.STRING,
				allowNull: true
			},
			gender: {
				type: DataTypes.ENUM('male', 'female'),
				allowNull: true
			},
			'full-name': {
				type: DataTypes.STRING(80),
				allowNull: false
			},
			'ban-time': {
				type: DataTypes.DATE,
				allowNull: true
			},
			status: {
				type: DataTypes.ENUM('active', 'non-active', 'banned'),
				allowNull: true
			}
		},
		associate: [
			{ type: 'belongsTo', model: 'role', foreignKey: 'role-id' }
		],
		config: {
			paranoid: true
		}
	}
}
