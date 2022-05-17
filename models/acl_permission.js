module.exports = function(DataTypes) {
	return {
		fields: {
			id: {
				type: DataTypes.BIGINT.UNSIGNED,
				primaryKey: true,
				autoIncrement: true
			},
			uid: {
				type: DataTypes.STRING,
				allowNull: false
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			'resource-id': {
				type: DataTypes.BIGINT.UNSIGNED,
				allowNull: false
			},
		},
		associate: [
			{ type: 'belongsTo', model: 'acl_resource', foreignKey: 'resource-id' }
		]
	}
}
