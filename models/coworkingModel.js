module.exports =(sequelize,DataTypes) =>{
	return sequelize.define('coworkings',{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: { 
			type: DataTypes.STRING,
			allowNull: false,
			validate:{
				notEmpty: {
					msg: 'Le nom ne peut pas être vide'
				}
			},
			unique : {
				msg : 'Le nom est déjà pris'
			}

		},
		price:{ 
			type:DataTypes.JSON,
			validate:{
			validatePrice(value){
				if (value.hasOwnProperty('hour') && value.hasOwnProperty('day') && value.hasOwnProperty('month')) {
				if (value.hour === null && value.day === null && value.month === null){
					throw new Error('Il faut que tu mettes des prix dans price');
				}
			} else {
				throw new Error ('La synthaxe des données est incorrecte.')
			}
			}
		}

		},
		address:DataTypes.JSON,
		superficy:{
			type: DataTypes.INTEGER,
			allowNull: false,
			validate:{
				isInt:{
					msg:'La superficy doit être un nombre entier.'
				}
			},
			isNumeric:{
				msg: 'La valeur doit êtres un chiffre'
			}
		},
		capacity:{ 
			type: DataTypes.INTEGER,
			allowNull: false,
			validate:{
				isInt:{
					msg:'La capacity doit être un nombre entier.'
				}
			},
			isNumeric:{
				msg: 'La valeur doit êtres un chiffre'
			}
		},
	})
}