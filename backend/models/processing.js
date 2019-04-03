var mongoose = require('mongoose')

var propertySchema = mongoose.Schema({
    location:{
        type: String,
        required: true
    },
    firstName:{
        type: String
    },
    lastName:{
        type:String
    },
    company:{
        type: String
    },
    status:{
        type:Number
    }
})

const Processing = module.exports = mongoose.model("Processing", propertySchema);
