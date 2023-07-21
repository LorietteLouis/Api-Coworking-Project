const { ValidationError, UniqueConstraintError } = require('sequelize')
const {UserModel} = require('../Bdd/sequelize')



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

exports.createdUser = (req, res) => {
        const users = req.body
        UserModel
        .create({
            firstName: users.firstName,
            lastName: users.lastName,
            username: users.username,
            password: users.password,
            })
        .then((user)=>{
            res.status(201).json({ message:'Un user a bien été ajouté',
            data: user})
        })
         .catch((error)=>{
            if (error instanceof ValidationError || error instanceof UniqueConstraintError){
                const cleanMessage = error.message.split(': ')[1]
                return res.status(400).json({message: cleanMessage})
         }
            res.status(500).json({ message:`Une erreur est survenu : ${error}`
        })
    })
}
            // const neoId = moc éléments users[moc éléments users.length-1].id +1
            // const ne éléments users = {id : neoId, ...req.body}
            // moc éléments users.push(ne éléments users)
            // return res.json({message : `Un nouveau coworking n°${ne éléments users.id} a été créé`, data : ne éléments users})
        
exports.updatedUser = (req,res) => {
    UserModel
    .findByPk(req.params.id)
    .then(result =>{
    if (!result){
        return res.status(404).json({message: 'Aucun user trouvé'})
    } else {
       return result
            .update(req.body)
            .then(() =>{
                res.status(201).json({message:`Le Coworking a été update: ${result.dataValues.id}`, data:result})

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
