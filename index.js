const mongoose = require('mongoose')
const express = require('express')

const app = express()
const router = express.Router()
const port = 3000

//mongodb+srv://kevinshe01:kevinykevin1@casas.yojdwum.mongodb.net/
mongoose.connect("mongodb+srv://kevinshe01:kevinykevin1@casas.yojdwum.mongodb.net/casas")
const UserSchema = require('./models/user.js')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(router)


router.get('/getusers', async (req, res) => {
    let users = await UserSchema.find()
    res.json(users)
})

router.get('/getusers/:id', async (req, res) => {
    var id = req.params.id
    let user = await UserSchema.find({
        _id: id
    })
    if(user == null){
        res.send("No hay datos que mostrar")
        return
    }
    res.json(user)
})


router.post('/adduser', (req, res) => {
    try{
        let user = UserSchema({
            _id: req.body.id,
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            rol: req.body.rol
        });
    
        user.save();
        res.send("exito");
    }catch (error){
        res.send("error al almacenar")
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

