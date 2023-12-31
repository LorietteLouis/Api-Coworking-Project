module.exports =(sequelize,DataTypes) =>{
	return sequelize.define('Role',{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        label: {
            type: DataTypes.STRING,
            createdAt: false,
            updateAt: false
        }
    })
}