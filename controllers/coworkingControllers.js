const {CoworkingModel} = require('../Bdd/coworkingSequelize')



exports.findAllCoworking = (req, res) => {

    CoworkingModel
        .findAll()
        .then(result => {
            res.json({message: 'La liste des coworkings a bien été récupérée.', data : result})
        })
        .catch(error => {
            res.json({message: `Une erreur est survenue : ${error}` })
        })
}
exports.findCoworkingByPk = (req, res) => {
     CoworkingModel
        .findByPk(req.params.id)
        .then(result =>{
            if (!result){
                res.json({message: `L'élément ayant pour id ${req.params.id} n'existe pas.`})
            } else {
                res.json({message: `L'élément a été récupéré.`, data: result})
            }
        })
        .catch(error => {
            res.json({message: `Une erreur est survenue : ${error}` })
        })
}

exports.createdCoworking = (req, res) => {
        const newcoworkings = req.body
        CoworkingModel
        .create({
            name: newcoworkings.name,
            price: newcoworkings.price,
            address: newcoworkings.address,
            superficy: newcoworkings.superficy,
            capacity: newcoworkings.capacity,
            })
        .then((coworking)=>{
            res.json({ message:'Un coworking a bien été ajouté',
            data: coworking})
        })
         .catch((error)=>{
            res.json({ message:`Une erreur est survenu : ${error}`
        })
    })
}
            // const neoId = mockcoworkings[mockcoworkings.length-1].id +1
            // const newcoworkings = {id : neoId, ...req.body}
            // mockcoworkings.push(newcoworkings)
            // return res.json({message : `Un nouveau coworking n°${newcoworkings.id} a été créé`, data : newcoworkings})
        
exports.updatedCoworking = (req,res) => {
    CoworkingModel
    .findByPk(req.params.id)
    .then(result =>{
    if (!result){
        return res.json({message: 'Aucun coworking trouvé'})
    } else {
        result
            .update(req.body)
            .then(() =>{
                res.json({message:`Le Coworking a été update: ${result.dataValues.id}`, data:result})

            })
    }
})
.catch(error => {
    res.json({message:`${error}`})
})
}
exports.deletedCoworking = (req,res) => {
    CoworkingModel
    .findByPk(req.params.id)
    .then(result =>{
    if (!result){
        return res.json({message: 'Aucun coworking trouvé'})
    } else {
        result
            .destroy()
            .then(() =>{
                res.json({message:`Coworking supprimé: ${result.dataValues.id}`, data:result})

            })
    }
})
.catch(error => {
    res.json({message:`${error}`})
})
}
