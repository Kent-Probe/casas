//modulos requeridos en el proyecto
const mongoose = require('mongoose')
const express = require('express')

//Configuracion de express
const app = express()
const router = express.Router()
const port = 3000

//Conexion a la base de datos
mongoose.connect("mongodb+srv://kevinshe01:kevinykevin1@casas.yojdwum.mongodb.net/casas")

//Midleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Rutas importadas al proyecto
const userRouters = require('./routers/UserRouters')

//Rutas usadas en el proyecto
app.use(router)
app.use('/', userRouters)


app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})

