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
				allowNull: false,
				unique: true
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			is_maintenance: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			}
		},
		associate: [
			{ type: 'hasMany', model: 'acl_permission', foreignKey: 'resource-id' }
		]
	}
}
