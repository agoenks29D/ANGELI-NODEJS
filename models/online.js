module.exports = function(DataTypes) {
	return {
		fields: {
			id: {
				type: DataTypes.BIGINT.UNSIGNED,
				primaryKey: true,
				autoIncrement: true
			},
			'session-uid' : {
				type: DataTypes.UUID,
				unique: true,
				allowNull: false
			},
			count: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1
			}
		},
		config: {
			timestamps: false
		}
	}
}
