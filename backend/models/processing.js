var mongoose = require('mongoose')

var propertySchema = mongoose.Schema({
    location:{
        type: String,
        required: true
    },
    rentee:{
        type: String
    },
    company:{
        type:String
    },
    price:{
        type: Number
    },
    start:{
        type:Number
    },
    end:{
        type:Number
    },
    image:{
        type:String
    }
})

const Processing = module.exports = mongoose.model("Processing", propertySchema);
