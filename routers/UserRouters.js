//Modulos requeridos en el archivo
const express = require("express");

//Ruta del archivo
const router = express.Router();

//modulos del archivo
const UserController = require("../controllers/UserController.js");

const userContrller = new UserController()
//Routers
router.get("/user", userContrller.validateToken, UserController.getUsers);
router.get("/user/:id", UserController.getOneUser);
router.post("/user", UserController.userInsert);
router.patch("/user", UserController.userUpdate);
router.delete("/user/:id", UserController.deleteUser);
router.post('/login', UserController.login);

//Exportar ruta del archivo
module.exports = router;
