const coworkings = require('./mock-coworkings');
const mockcoworkings = require('./mock-coworkings')

const express = require('express');
const app = express();

const port = 3000;

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
    res.json({result:`Nom du coworking : ${targetCoworking ? targetCoworking.name : 'inconnu'}`});
});

app.get('/api/coworkings', (req, res) => {
	const criterium = req.query.criterium || 'superficy'
	const orderBy = req.query.orderBy || 'ASC'

	if((orderBy === 'ASC' || orderBy === 'DESC') && (criterium === 'superficy'||criterium === 'capacity')) {
	mockcoworkings.sort( (a, b) => {
		return orderBy === 'DESC' ? b[criterium] - a[criterium] : a[criterium] - b[criterium];
	  });
	}
	res.json(mockcoworkings)
})


app.listen(port, () => console.log(
	`Notre application Node est démarrée sur : http://localhost:${port}`)
)

/* 
	Pourquoi utilise t-on require et non pas import ?
	require() est une fonction native propre à NodeJS, 
	elle permet de charger un module entier 
*/