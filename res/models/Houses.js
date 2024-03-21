const mongoose = require("mongoose");

let HouseSchema = new mongoose.Schema({
    "address": {
        type: String, 
        require: true
    },
    "city": {
        type: String, 
        require: true
    },
    "state": {
        type: String, 
        require: true
    },
    "size": {
        type: Number, 
        require: true
    },
    "type": {
        type: String, 
        require: true
    },
    "zipcode": {
        type: Number, 
        require: true,
        default: 1
    },
    "rooms": {
        type: Number, 
        require: true
    },
    "bathrooms": {
        type: Number, 
        require: true
    },
    "parking": {
        type: Boolean, 
        require: true,
        default: false
    },
    "price": {
        type: Number, 
        require: true
    },
    "code": {
        type: String,
        require: true,
        unique: true
    },
    "image": {
        type: String, 
        require: true
    },
})
    
module.exports = mongoose.model('houses', HouseSchema)