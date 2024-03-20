const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
    id: Number,
    name: {
        type:String, 
        require:true
    },
    lastname: String,
    email: {
        type:String, 
        require:true
    },
    password: String,
    rol: String    
})

module.exports = mongoose.model('user', UserSchema)