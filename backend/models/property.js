var mongoose = require('mongoose')

var propertySchema = mongoose.Schema({
    status:{
        type: Number
    },
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
    },
    thisCompany:{
        type: Number
    },
    success:{
        type: Number
    }
})
//this company: 1 for yes, 0 for no
// success: 0 for unknown, 1 for processing, 2 for failure, 3 for success
const Property = module.exports = mongoose.model("Property", propertySchema);
