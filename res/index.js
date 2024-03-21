//modulos requeridos en el proyecto
const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();

const DB_URL = process.env.DB_URL || "";

//Configuracion de express
const app = express();
const router = express.Router();
const port = 3000;

//Conexion a la base de datos
mongoose.connect(DB_URL);

//Midleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Rutas importadas al proyecto
const userRouters = require("./routers/UserRouters");
const houseRouters = require("./routers/HouseRouters");

//Rutas usadas en el proyecto
app.use(router);
app.use("/", userRouters);
app.use("/", houseRouters);
app.use('/res', express.static('res'))

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
