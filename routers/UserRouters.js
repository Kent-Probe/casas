//Modulos requeridos en el archivo
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Ruta del archivo
const router = express.Router();

//Conexion a la base de datos
mongoose.connect(
  
);

//modulos de la base de datos
const UserSchema = require("../models/User.js");

//obtener usuarios
router.get("/user", async (req, res) => {
  try {
    let users = await UserSchema.find();
    res.json({
      status: "success",
      message: "Users found successfuly",
      data: users,
    });
  } catch (err) {
    res.json({
      status: "failed",
      message: "Error, users not found",
    });
  }
});

//guardar usuario
router.post('/user', async (req, res) =>{
    try{
        const HashedPassword = await bcrypt.hash(req.body.password, 10)

        let user = UserSchema({
            id: req.body.id,
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: HashedPassword,
            rol: req.body.rol
        })

        user.save().then(()=>{
            res.json({
                "status": "success", 
                "message": "User insert successfuly"
            })
        }).catch((err) =>{
            if(err.errors.email.message != null){
                res.json({
                    status: "failed",
                    message: "Error, email no valido",
                });
            }
            else if(err.code == 11000){
                res.json({
                    status: "failed",
                    message: "Error, email or ide be register",
                });  
            }else{
                res.json({
                    "status": "failed", 
                    "message": "Error insert user"
                })
            }  
        })
    }catch(err){
        res.json({
            "status": "failed", 
            "message": "missing argument"
        })
    }
})

//obtener un solo usuario
router.get("/user/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let user = await UserSchema.find({
      id: id,
    });
    res.json({
      status: "success",
      message: "User found successfuly",
      data: user,
    });
  } catch (err) {
    res.json({
      status: "failed",
      message: "Error, user not found",
    });
  }
});

//Actualizar Usuario
router.patch("/user", async (req, res) => {
  //identificador para buscsar
  let ide = req.body.id;

  //validar si se cambia la contraseña
  let passwordUpdate 
  if(req.body.password != undefined || req.body.password != null) {
    passwordUpdate = await bcrypt.hash(req.body.password, 10)
  }else{
    passwordUpdate = req.body.password
  }


  //Datos a actualizar
  let updateUser = {
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password: passwordUpdate,
    rol: req.body.rol,
  };

  //Opciones de la actualizacion
  let opt = {
    returnDocument: "after",
  };

  //encontrar y actualizar
  UserSchema.findOneAndUpdate({ id: ide }, updateUser, opt)
    .then((result) => {
      res.json({
        status: "success",
        message: "User updated successfully",
      });
    })
    .catch((err) => {
      if(err.code == 11000){
        res.json({
            status: "failed",
            message: "Error, email or ide be register",
        });  
        return  
      }
      
      res.json({
        status: "failed",
        message: "Error updating user",
      });
    });
});

//Eliminar Usuario
router.delete("/user/:id", (req, res) => {
  let id = req.params.id;

  UserSchema.deleteOne({ id: id })
    .then(() => {
      res.json({
        status: "success",
        message: "User deleted successfully",
      });
    })
    .catch((err) => {
      res.json({
        status: "failed",
        message: "Error deleting user",
      });
    });
});

//Exportar ruta del archivo
module.exports = router;
