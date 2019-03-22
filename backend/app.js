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
Processing = require('./models/processing')

mongoose.connect('mongodb://localhost/Database', { useNewUrlParser: true })

var HouseArray = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"]
var prices = [499, 199, 75, 143, 324, 659, 793, 458,834,3880]


var abc = function() {
	console.log("geenrate")
	for (i = 0 ; i < 9; i++) {
		prop = {
			status: 0,
			location: HouseArray[i],
			rentee: "empty",
			company: "empty",
			price: prices[i],
			start: 0,
			end: 0,
			image: "./images/" + i.toString() + ".jpg"
		}

		Property.create(prop, (err,Propertyz) => {
        if(err){
            throw err;
        }
    })

	}
}


//abc()

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

app.post('/api/updateData', (req, res) => {
	console.log(req.body.update.location)
	var id = req.body.update._id;
	var myProperty = null; 
	Property.find({location: req.body.update.location}, (err, Propertyz) => {
		myProperty = Propertyz
		console.log(myProperty[0].status)
		if(myProperty[0].status != 1) { // returns and doesn't update if true
			console.log("updating")
			Property.findOneAndUpdate({ location: req.body.update.location }, req.body.update, err => {
				if (err) return res.json({ success: false, error: err });
				return res.json({ success: true });
			});
		}
		else {
			console.log("rejecting")
			return res.json({ success: true });
		}
	})
	
// can only update the database if avail or processing
/*
	Property.findOneAndUpdate({ location: req.body.update.location }, req.body.update, err => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});


*/
    
	}
)


app.get('/api/processing', (req, res) => {
	Processing.find((err, Propertys) => {
		if(err){
			throw err;
		}
		res.json({ data: Propertys});
	});
});

app.post('/api/processing', (req, res) => {
    var prop = req.body
    Processing.create(prop, (err,Property) => {
        if(err){
            throw err;
        }
        res.json(Property)
    })
})


app.post('/api/updateProcessing', (req, res) => {
	console.log(req.body.update.location)
	var id = req.body.update._id;
	// can only be updated if it is in processing or avail.
	Processing.findOneAndUpdate({ status: 0, location: req.body.update.location }, req.body.update, err => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});
	Processing.findOneAndUpdate({ status: 2, location: req.body.update.location }, req.body.update, err => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});
	
	}
)



app.listen(3001)
console.log('starting')