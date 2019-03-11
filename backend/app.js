var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var cors = require('cors');

// cors help from https://stackoverflow.com/questions/50873764/cross-origin-read-blocking-corb

app.use(bodyParser.json());

app.use(cors({
	'allowedHeaders': ['sessionId', 'Content-Type'],
	'exposedHeaders': ['sessionId'],
	'origin': '*',
	'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
	'preflightContinue': false
  }));

Property =require('./models/property');

mongoose.connect('mongodb://localhost/Home')


var abc = function() {
	console.log("geenrate")
	for (i = 0 ; i < 20; i++) {
		prop = {
			status: 0,
			location: "property1" + i.toString(),
			rentee: "empty",
			company: "empty",
			price: 100+i,
			start: 0,
			end: 0
		}

		Property.create(prop, (err,Property) => {
        if(err){
            throw err;
        }
        res.json(Property)
    })

	}
}


app.get('/api/property', (req, res) => {
	Property.find((err, Propertys) => {
		if(err){
			throw err;
		}
		res.json({ data: Propertys});
	});
});

app.post('/api/property', (req, res) => {
    var prop = req.body
    Property.create(prop, (err,Property) => {
        if(err){
            throw err;
        }
        res.json(Property)
    })
})

app.put('/api/property/:_id', (req, res) => {
	var id = req.params._id;
	var Property = req.body;
	Property.findOneAndUpdate(id, Property, {}, (err, Property) => {
		if(err){
			throw err;
		}
		res.json(Property);
	});
});


app.listen(3001)
console.log('starting')