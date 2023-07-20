const { Sequelize, DataTypes } = require('sequelize');
const mockcoworkings = require('./mock-coworkings')

    const sequelize = new Sequelize('coworkings', 'root', '', {
        host: 'localhost',
        dialect:'mariadb',
        logging:false
    })
    
    const defineCoworkingModel = require('../models/coworkingModel')
    const CoworkingModel = defineCoworkingModel(sequelize,DataTypes)
    
    
    
   
    
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
            })
        }
        module.exports = {
            initDb, CoworkingModel
        }