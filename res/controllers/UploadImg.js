const multer = require('multer');
const UserSchema = require("../models/User.js");

class UploadImg{
    constructor(){}
    

    static uploadImgUser = (req, res) => {
        try{
            if(!req.file){
                return res.status(400).send({
                    status: 'failed',
                    message: "File was not uploaded"
                })
            }
            var id = req.params.id;

            var updateUser = {
                avatar: req.file.path
            }

            UserSchema.findOneAndUpdate({id: id}, updateUser, {new: true}).then((result) =>{
                res.status(200).send({
                    status:'success',
                    message: "File uploaded successfully",
                    file: req.file,
                    new: result
                })
            }).catch((err) =>{
                res.status(501).send({
                    status:'failed',
                    message: "error while uploading file",
                })
            }) 
        }catch(e){
            res.status(500).send({
                status:'failed',
                message: "error while uploading file",
            })
        }
    }

    static uploadImgHouse = (req, res) => {
        if(!req.file){
            return res.status(400).send({
                status: 'failed',
                message: "File was not uploaded"
            })
        }
        try{
            var code = req.params.code;
            
            var updateHouse = {
                Image: req.file.path
            }

            UserSchema.findOneAndUpdate({code: code}, updateHouse, {new: true}).then((result) =>{
                res.status(200).send({
                    status:'success',
                    message: "File uploaded successfully",
                    file: req.file,
                    new: result
                })
            }).catch((err) =>{
                res.status(501).send({
                    status:'failed',
                    message: "error while uploading file",
                })
            }) 
        }catch(e){
            res.status(500).send({
                status:'failed',
                message: "error while uploading file",
            })
        }
    }
}

module.exports = UploadImg;