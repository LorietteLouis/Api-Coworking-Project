const { ValidationError, UniqueConstraintError } = require('sequelize')
const {UserModel} = require('../Bdd/sequelize')
const  bcrypt = require('bcrypt')



exports.findAllUser = (req, res) => {

    UserModel
        .findAll()
        .then(result => {
            res.status(201).json({message: 'La liste des éléments users a bien été récupérée.', data : result})
        })
        .catch(error => {
            res.status(500).json({message: `Une erreur est survenue : ${error}` })
        })
}
exports.findUserByPk = (req, res) => {
     UserModel
        .findByPk(req.params.id)
        .then(result =>{
            if (!result){
                res.status(404).json({message: `L'élément ayant pour id ${req.params.id} n'existe pas.`})
            } else {
                res.status(201).json({message: `L'élément a été récupéré.`, data: result})
            }
        })
        .catch(error => {
            res.status(500).json({message: `Une erreur est survenue : ${error}` })
        })
}


exports.updatedUser = (req,res) => {
    UserModel
    .findByPk(req.params.id)
    .then(result =>{
    if (!result){
        return res.status(404).json({message: 'Aucun user trouvé'})
    } else {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const dataUser = {...req.body, password: hash}
            return result
            .update(dataUser)
            .then(() =>{
                res.status(201).json({message:`Le Coworking a été update: ${result.dataValues.id}`, data:result})
                })

            })
    }
})
.catch(error => {
    res.status(500).json({message:`${error}`})
})
}
exports.deletedUser = (req,res) => {
    UserModel
    .findByPk(req.params.id)
    .then(result =>{
    if (!result){
        return res.status(404).json({message: 'Aucun user trouvé'})
    } else {
       return result
            .destroy()
            .then(() =>{
                res.status(201).json({message:`User supprimé: ${result.dataValues.id}`, data:result})

            })
    }
})
.catch(error => {
    res.status(500).json({message:`${error}`})
})
}
