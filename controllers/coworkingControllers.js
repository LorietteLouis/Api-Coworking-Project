const {coworkingModel} = require('../Bdd/sequelize')



exports.findAllCoworking = (req, res) => {

    coworkingModel
        .findAll()
        .then(result => {
            res.status(201).json({message: 'La liste des coworkings a bien été récupérée.', data : result})
        })
        .catch(error => {
            res.status(500).json({message: `Une erreur est survenue : ${error}` })
        })
}
exports.findCoworkingByPk = (req, res) => {
     coworkingModel
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

exports.createdCoworking = (req, res) => {
        const newcoworkings = req.body
        coworkingModel
        .create({
            name: newcoworkings.name,
            price: newcoworkings.price,
            address: newcoworkings.address,
            superficy: newcoworkings.superficy,
            capacity: newcoworkings.capacity,
            })
        .then((coworking)=>{
            res.status(201).json({ message:'Un coworking a bien été ajouté',
            data: coworking})
        })
         .catch((error)=>{
            res.status(500).json({ message:`Une erreur est survenu : ${error}`
        })
    })
}
            // const neoId = mockcoworkings[mockcoworkings.length-1].id +1
            // const newcoworkings = {id : neoId, ...req.body}
            // mockcoworkings.push(newcoworkings)
            // return res.json({message : `Un nouveau coworking n°${newcoworkings.id} a été créé`, data : newcoworkings})
        
exports.updatedCoworking = (req,res) => {
    coworkingModel
    .findByPk(req.params.id)
    .then(result =>{
    if (!result){
        return res.status(404).json({message: 'Aucun coworking trouvé'})
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
exports.deletedCoworking = (req,res) => {
    coworkingModel
    .findByPk(req.params.id)
    .then(result =>{
    if (!result){
        return res.status(404).json({message: 'Aucun coworking trouvé'})
    } else {
       return result
            .destroy()
            .then(() =>{
                res.status(201).json({message:`Coworking supprimé: ${result.dataValues.id}`, data:result})

            })
    }
})
.catch(error => {
    res.status(500).json({message:`${error}`})
})
}
