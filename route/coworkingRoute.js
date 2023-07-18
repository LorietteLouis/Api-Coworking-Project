const express = require('express')
const router = express.Router()
const mockcoworkings = require('../mock-coworkings')

router
        .route('/')
        .get( (req, res) => {
            const criterium = req.query.criterium || 'superficy'
            const orderBy = req.query.orderBy || 'ASC'
        
            const arrToSort = [...mockcoworkings]
        
        
        
            if ((orderBy === 'ASC' || orderBy === 'DESC') && (criterium === 'superficy' || criterium === 'capacity')) {
        
                arrToSort.sort((a, b) => {
                    return orderBy === 'DESC' ? b[criterium] - a[criterium] : a[criterium] - b[criterium]
                })
            }
        
            res.json(arrToSort)
        })
        .post((req, res) => {
            const neoId = mockcoworkings[mockcoworkings.length-1].id +1
            const newcoworkings = {id : neoId, ...req.body}
            mockcoworkings.push(newcoworkings)
            return res.json({message : `Un nouveau coworking n°${newcoworkings.id} a été créé`, data : newcoworkings})
        })

router
        .route('/:id')
        .get((req, res) => {
 

            let targetCoworking = mockcoworkings.find(el => el.id === parseInt (req.params.id))
            if (targetCoworking){
                return res.json({message:`L'id ${targetCoworking.id} a bien été récupéré.`, data: targetCoworking })
            }else{
                return res.json({message:`Le coworking ${req.params.id} n'a pas été retrouvé.`})
            }
        })
        .put((req,res) => {
            const indexInArray = mockcoworkings.findIndex((element) =>{
                return element.id === parseInt(req.params.id)
            })	
            let updatedCoworking = {...mockcoworkings[indexInArray],...req.body}
            mockcoworkings[indexInArray] = updatedCoworking
        
            if (updatedCoworking){
                return res.json({message:`Le coworking ${updatedCoworking.id} a été modifié`,data:updatedCoworking})
            } else {
                return res.json({message: `Le coworking ${req.params.id} n'a pas été modifié.`})
            }
        })
        .delete((req,res) => {
            const indexInArray = mockcoworkings.findIndex((element)=>{
                return element.id === parseInt(req.params.id)
            })
            if (indexInArray === -1){
                return res.json({message:`L'id ${req.params.id} ne correspond à aucun élément`})
            } else {
                mockcoworkings.splice(indexInArray, 1)
                return res.json({message:`Le coworking ${req.params.id} est delete`, data:mockcoworkings})
            }
        })


module.exports = router