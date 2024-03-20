const bcrypt = require("bcrypt");
const UserSchema = require("../models/User.js");
const jwt = require("jsonwebtoken");

require('dotenv').config()

const SECRET = process.env.JWT_SECRET

class UserController {
    constructor() {}

    validateToken(req, res, next){
        const bearerToken = req.headers['authorization']
        if(!bearerToken){
            return res.status(401).json({
                message: "Not authorizated"
            })
        }

        const token = bearerToken.startsWith("Bearer ")? bearerToken.slice(7) : bearerToken;
        jwt.verify(token, SECRET, (err, decoded) => {
            if(err){
                return res.status(401).json({
                    message: "Not authorizated"
                })
            }
            req.userId = decoded.userId;
            next();
        })
    }

    //Obtener todos los usuarios
    static getUsers = async (req, res) => {
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
    };

    //Obtener un usuario
    static getOneUser = async (req, res) => {
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
    };

    //Actualizar un usuario
    static userUpdate = async (req, res) => {
        //identificador para buscsar
        let ide = req.body.id;

        //validar si se cambia la contraseña
        let passwordUpdate;
        if (req.body.password != undefined || req.body.password != null) {
            passwordUpdate = await bcrypt.hash(req.body.password, 10);
        } else {
            passwordUpdate = req.body.password;
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
                if (err.code == 11000) {
                    res.json({
                        status: "failed",
                        message: "Error, email or ide be register",
                    });
                    return;
                }

                res.json({
                    status: "failed",
                    message: "Error updating user",
                });
            });
    };

    //Borrar un usuario
    static deleteUser = (req, res) => {
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
    };

    //Registrar un usuario
    static userInsert = async (req, res) => {
        try {
            const HashedPassword = await bcrypt.hash(req.body.password, 10);

            let user = UserSchema({
                id: req.body.id,
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                password: HashedPassword,
                rol: req.body.rol,
            });

            user.save()
                .then(() => {
                    res.json({
                        status: "success",
                        message: "User insert successfuly",
                    });
                })
                .catch((err) => {
                    if (err.errors.email.message != null) {
                        res.json({
                            status: "failed",
                            message: "Error, email no valido",
                        });
                    } else if (err.code == 11000) {
                        res.json({
                            status: "failed",
                            message: "Error, email or ide be register",
                        });
                    } else {
                        res.json({
                            status: "failed",
                            message: "Error insert user",
                        });
                    }
                });
        } catch (err) {
            res.json({
                status: "failed",
                message: "missing argument",
            });
        }
    };

    //ingresar sesion
    static login = async (req, res) => {
        try {
            const user = await UserSchema.findOne({
                email: req.body.email,
            });

            if (!user) {
                res.status(200).json({
                    status: "failed",
                    message: "User not exist",
                });
                return;
            }

            const passwordMatch = await bcrypt.compare(
                req.body.password,
                user.password
            );

            if (!passwordMatch) {
                res.status(200).json({
                    status: "failed",
                    message: "Password incorrect",
                });
                return;
            }

            const token = jwt.sign(
                {
                    userId: user._id,
                },
                SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({
                status: "success",
                message: "login successfuly",
                token: token,
            });
        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: "error in the conexion",
            });
        }
    };
}

module.exports = UserController;
