module.exports =(sequelize,DataTypes) =>{
	return sequelize.define('coworkings',{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: DataTypes.STRING,
		price:DataTypes.JSON,
		address:DataTypes.JSON,
		superficy:DataTypes.INTEGER,
		capacity: DataTypes.INTEGER,
	})
}