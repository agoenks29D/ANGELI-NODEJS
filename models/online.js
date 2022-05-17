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
			'logged-in' : {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false
			},
			count: {
				type: DataTypes.INTEGER(6),
				allowNull: false,
				defaultValue: 1
			}
		},
		config: {
			timestamps: false
		}
	}
}
