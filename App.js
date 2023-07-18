const coworkings = require('./mock-coworkings');
const mockcoworkings = require('./mock-coworkings')

const express = require('express');
const app = express();

const port = 3000;

app.use(express.json())

// respond with "hello world" when a GET request is made to the homepage
app.get('/api/coworkings/:id', function (req, res) {
    // console.log(mockcoworkings)
    // console.log(parseInt(req.params.name),mockcoworkings[0].name)
	// let targetCoworking;
	// 	for (let i = 0; i < mockcoworkings.length; i++){
	// 		const element = mockcoworkings[i];
	// 		if (element.name === parseInt(req.params.name)){
	// 			targetCoworking = element
	// 			break;
	// 		}
	// }

	let targetCoworking = mockcoworkings.find(el => el.id === parseInt (req.params.id))
	if (targetCoworking){
		return res.json({message:`L'id ${targetCoworking.id} a bien été récupéré.`, data: targetCoworking })
	}else{
		return res.json({message:`Le coworking ${req.params.id} n'a pas été retrouvé.`})
	}
});

app.get('/api/coworkings', (req, res) => {
	const criterium = req.query.criterium || 'superficy'
	const orderBy = req.query.orderBy || 'ASC'

	const arrToSort = [...mockcoworkings]



    // if ((orderBy === 'ASC' || orderBy === 'DESC') && (criterium === 'superficy' || criterium === 'capacity')) {

    //     arrToSort.sort((a, b) => {
    //         return orderBy === 'DESC' ? b[criterium] - a[criterium] : a[criterium] - b[criterium]
    //     })
    // }

    res.json(arrToSort)
})


app.post('/api/coworkings',(req, res) => {
	const neoId = mockcoworkings[mockcoworkings.length-1].id +1
	const newcoworkings = {id : neoId, ...req.body}
	mockcoworkings.push(newcoworkings)
	return res.json({message : `Un nouveau coworking n°${newcoworkings.id} a été créé`, data : newcoworkings})
})

app.put('/api/coworkings/:id',(req,res) => {
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


app.delete('/api/coworkings/:id',(req,res) => {
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
app.listen(port, () => console.log(
	`Notre application Node est démarrée sur : http://localhost:${port}`)
)

/* 
	Pourquoi utilise t-on require et non pas import ?
	require() est une fonction native propre à NodeJS, 
	elle permet de charger un module entier 
*/

