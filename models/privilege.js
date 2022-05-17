module.exports = function(DataTypes) {
	return {
		fields: {
			id: {
				type: DataTypes.BIGINT.UNSIGNED,
				primaryKey: true,
				autoIncrement: true
			},
			'user-id': {
				type: DataTypes.BIGINT.UNSIGNED,
				allowNull: true
			},
			'role-id': {
				type: DataTypes.BIGINT.UNSIGNED,
				allowNull: true
			},
			'permission-id': {
				type: DataTypes.BIGINT.UNSIGNED,
				allowNull: false
			},
			'data-id': {
				type: DataTypes.BIGINT.UNSIGNED,
				allowNull: true
			}
		},
		associate: [
			{ type: 'belongsTo', model: 'user', foreignKey: 'user-id' },
			{ type: 'belongsTo', model: 'role', foreignKey: 'role-id' },
			{ type: 'belongsTo', model: 'acl_permission', foreignKey: 'permission-id' }
		]
	}
}
