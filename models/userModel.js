module.exports =(sequelize,DataTypes) =>{
	return sequelize.define('users',{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		firstName: { 
			type: DataTypes.STRING,
			allowNull: false,
			validate:{
				notEmpty: {
					msg: 'Le nom ne peut pas être vide'
				}
			},

		},
        lastName: { 
			type: DataTypes.STRING,
			allowNull: false,
			validate:{
				notEmpty: {
					msg: 'Le prenom ne peut pas être vide'
				}
			},

		},
        username: { 
			type: DataTypes.STRING,
			allowNull: false,
			validate:{
				notEmpty: {
					msg: 'Le pseudo ne peut pas être vide'
				}
			},
			unique : {
				msg : 'Le pseudo est déjà pris'
			}

		},

        password: { 
			type: DataTypes.STRING,
			allowNull: false,
			validate:{
				notEmpty: {
					msg: 'Le mot de Passe ne peut pas être vide'
				}
			},
			unique : {
				msg : 'Le pseudo est déjà pris'
			}

		},
    })
}