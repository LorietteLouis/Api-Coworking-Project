const { Sequelize, DataTypes } = require('sequelize');
const setData = require('./setData')

const sequelize = new Sequelize('coworkings', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.log(`Ìmpossible de se connecter à la base de données ${error}`))

const defineCoworkingModel = require('../models/coworkingModel')
const defineUserModel = require('../models/userModel')
const defineRoleModel = require('../models/roleModel')
const defineReviewModel = require('../models/reviewModel')

const coworkingModel = defineCoworkingModel(sequelize, DataTypes)
const userModel = defineUserModel(sequelize, DataTypes)
const roleModel = defineRoleModel(sequelize, DataTypes)
const reviewModel = defineReviewModel(sequelize, DataTypes)

roleModel.hasMany(userModel)
userModel.belongsTo(roleModel)

userModel.hasMany(reviewModel, {
    foreignKey: {
        allowNull: false
    }
});
reviewModel.belongsTo(userModel);

userModel.hasMany(coworkingModel, {
    foreignKey: {
        allowNull: false
    }
});
coworkingModel.belongsTo(userModel);

coworkingModel.hasMany(reviewModel, {
    foreignKey: {
        allowNull: false
    }
});
reviewModel.belongsTo(coworkingModel);

const initDb = () => {
    sequelize
        .sync({ force: true })
        .then(() => {
            setData(coworkingModel, userModel, roleModel, reviewModel)
        })
}

module.exports = {
    initDb, coworkingModel, userModel, roleModel, reviewModel
}