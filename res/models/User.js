const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
    "id": {
        type: Number,
        require: true,
        unique: true
    },
    "name": {
        type: String, 
        require: true
    },
    "lastname": {
        type: String, 
        require: true
    },
    "email": {
        type: String, 
        require: true,
        unique: true,
        validate:{
            validator: function(v){
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
            },
            message: "el email no es valido"
        }
    },
    "password": {
        type: String, 
        require: true
    },
    "rol": {
        type: String, 
        default: "usuario"
    },
    "avatar": {
        type: String
    } 
})

module.exports = mongoose.model('User', UserSchema)