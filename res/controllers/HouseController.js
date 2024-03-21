const HouseSchema = require("../models/Houses.js");
const jwt = require("jsonwebtoken");
import('node-fetch').then(module => {
    const fetch = module.default;
    // Ahora puedes usar la función fetch aquí
  }).catch(error => {
    console.error('Error al importar node-fetch:', error);
  });

require("dotenv").config();

const SECRET = process.env.JWT_SECRET;

class HouseController {
    constructor() {}

    validateToken(req, res, next) {
        const bearerToken = req.headers["authorization"];
        if (!bearerToken) {
            return res.status(401).json({
                message: "Not authorizated",
            });
        }

        const token = bearerToken.startsWith("Bearer ")
            ? bearerToken.slice(7)
            : bearerToken;
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Not authorizated",
                });
            }
            req.houseId = decoded.houseId;
            next();
        });
    }

    //Obtener todos los usuarios
    static getHouses = async (req, res) => {
        try {
            let houses = await HouseSchema.find();
            res.json({
                status: "success",
                message: "Houses found successfuly",
                data: houses,
            });
        } catch (err) {
            res.json({
                status: "failed",
                message: "Error, houses not found",
            });
        }
    };

    //Obtener un usuario
    static getOneHouse = async (req, res) => {
        try {
            let code = req.params.code;
            let house = await HouseSchema.find({
                code: code,
            });
            res.json({
                status: "success",
                message: "House found successfuly",
                data: house,
            });
        } catch (err) {
            res.json({
                status: "failed",
                message: "Error, house not found",
            });
        }
    };

    //Actualizar un usuario
    static houseUpdate = async (req, res) => {
        //identificador para buscsar
        let code = req.body.code;

        //Datos a actualizar
        let updateHouse = {
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            size: req.body.size,
            type: req.body.type,
            zipcode: req.body.zipcode,
            rooms: req.body.rooms,
            bathrooms: req.body.bathrooms,
            parking: req.body.parking,
            price: req.body.price,
        };

        //Opciones de la actualizacion
        let opt = {
            returnDocument: "after",
        };

        //encontrar y actualizar
        HouseSchema.findOneAndUpdate({ code: code }, updateHouse, opt)
            .then((result) => {
                res.json({
                    status: "success",
                    message: "House updated successfully",
                    data: result,
                });
            })
            .catch((err) => {
                if (err.code == 11000) {
                    res.json({
                        status: "failed",
                        message: "Error, email or code be register",
                    });
                    return;
                }

                res.json({
                    status: "failed",
                    message: "Error updating house",
                });
            });
    };

    //Borrar un usuario
    static deleteHouse = (req, res) => {
        let code = req.params.code;

        HouseSchema.deleteOne({ code: code })
            .then(() => {
                res.json({
                    status: "success",
                    message: "House deleted successfully",
                });
            })
            .catch((err) => {
                res.json({
                    status: "failed",
                    message: "Error deleting house",
                });
            });
    };

    //Registrar un usuario
    static houseInsert = async (req, res) => {
        try {
            let departmentId

            const departamentBody = req.body.state.toUpperCase();
            const cityBody = req.body.city.toUpperCase();

            let cityApi = await fetch("https://api-colombia.com/api/v1/city");
            let responseCity = await cityApi.json();
            const response = responseCity.some((city) => {
                if (city.name.toUpperCase() == cityBody) {
                    departmentId = city.departmentId
                    return true;
                }else return false;
            })

            if(response){
                let departamentApi = await fetch("https://api-colombia.com/api/v1/department")
                let responseDepartaments = await departamentApi.json();
                const responseDepartament = responseDepartaments.some((departament) => {
                    if (departament.id == departmentId && departament.name.toUpperCase() == departamentBody) {
                        return true;
                    }else return false;
                })
                if(!responseDepartament){
                    return res.status(400).json({
                        status: "failed",
                        message: "Error, departament not found",
                    });
                }
            }else{
                return res.status(400).json({
                    status: "failed",
                    message: "Error, city not found",
                });
            }

            let house = HouseSchema(req.body);

            house
                .save()
                .then(() => {
                    res.json({
                        status: "success",
                        message: "House insert successfuly",
                    });
                })
                .catch((err) => {
                    if (err.code == 11000) {
                        res.json({
                            status: "failed",
                            message: "Error, code be register",
                        });
                    } else {
                        res.json({
                            status: "failed",
                            message: "Error insert house",
                        });
                    }
                });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                status: "failed",
                message: "missing argument",
            });
        }
    };
}

module.exports = HouseController;
