const { Sequelize, DataTypes } = require('sequelize');
const mockcoworkings = require('./mock-coworkings')
const mockusers = require('./mock-users')

    const sequelize = new Sequelize('coworkings', 'root', '', {
        host: 'localhost',
        dialect:'mariadb',
        logging:false
    })
    
    const defineCoworkingModel = require('../models/coworkingModel')
    const CoworkingModel = defineCoworkingModel(sequelize,DataTypes)
    
    const defineUserModel = require('../models/userModel')
    const UserModel = defineUserModel(sequelize,DataTypes)
    
   
    
            sequelize.authenticate()
        .then(() =>console.log('La connexion à la base de données a bien été établie.'))
        .catch(error => console.log(`Impossible de se connecter à la base de données ${error}`
        ))

        const initDb = () => {
            sequelize.sync({force: true})
            .then(()=>{
                mockcoworkings.forEach(mock => {
                    CoworkingModel.create({
                        name: mock.name,
                        price: mock.price,
                        address: mock.address,
                        superficy: mock.superficy,
                        capacity: mock.capacity,
                        });
                    })
                    // mockusers.forEach(user =>{
                     UserModel.create({
                            firstName:"Louis",
                            lastName: "Loriette",
                            username: "UnderSioul",
                            password:"ATlanThroPiA"
                    })
                })
            }
            // )
        // }
        module.exports = {
            initDb, CoworkingModel, UserModel
        }