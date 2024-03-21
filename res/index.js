//modulos requeridos en el proyecto
const mongoose = require("mongoose");
const express = require("express");
const socket = require("socket.io");

require("dotenv").config();

const DB_URL = process.env.DB_URL || "";

//Configuracion de express
const app = express();
const router = express.Router();
const port = 3000;

//configuracion de Socket
const http = require("http").Server(app);
const io = socket(http);

//Conexion a la base de datos
mongoose.connect(DB_URL);

//Rutas importadas al proyecto
const userRouters = require("./routers/UserRouters");
const houseRouters = require("./routers/HouseRouters");
const chatRouters = require("./routers/ChatsRouters");
const MessageSchema = require("./models/Message");

//Midleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Activar el web socket
io.on("connect", (socket) => {
    console.log("Connect");

    socket.on("message", (data) => {
        var playload = JSON.parse(data);
        console.log(playload);

        MessageSchema(playload).save().then((result) => {
            socket.broadcast.emit("message-server", playload);
        }).catch(() => {
            console.log("message-server", "Ocurrio un error");
        });
    });
});

io.on('disconnect', (socket) => {
    console.log('disconnect');
})
app.use((req, res, next) => {
    res.io = io;
    next();
});

//ruta de test

app.get("/test", (req, res) => {
    res.json({
        message: "Hello World",
    });
});

//Rutas usadas en el proyecto
app.use(router);
app.use("/", userRouters);
app.use("/", houseRouters);
app.use("/", chatRouters);
app.use("/res", express.static("res"));

http.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
