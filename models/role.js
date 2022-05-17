module.exports = function(DataTypes) {
	return {
		fields: {
			id: {
				type: DataTypes.BIGINT.UNSIGNED,
				primaryKey: true,
				autoIncrement: true
			},
			uid: {
				type: DataTypes.STRING(40),
				allowNull: false
			},
			name: {
				type: DataTypes.STRING(40),
				allowNull: true
			},
			description: {
				type: DataTypes.TEXT('tiny'),
				allowNull: true
			},
			status: {
				type: DataTypes.ENUM('active', 'non-active'),
				allowNull: true
			}
		},
		associate: [
			{ type: 'hasMany', model: 'user', foreignKey: 'role-id' },
		],
		config: {
			paranoid: true
		}
	}
}
