//Modulos requeridos en el archivo
const express = require("express");
const multer = require('multer');

//Ruta del archivo
const router = express.Router();

//modulos del archivo
const HouseController = require("../controllers/HouseController.js");
const UploadImg = require("../controllers/UploadImg.js");

//multer
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'res/uploads/houses/')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const fileFilter = (req, file, cb) =>{
    if(file.mimetype.startsWith('image/')){
        cb(null, true);
    }else{
        cb(new Error('File not is image'), false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});



//Routers
router.get("/houses", HouseController.getHouses);
router.get("/houses/:code", HouseController.getOneHouse);
router.post("/houses", HouseController.houseInsert);
router.patch("/houses", HouseController.houseUpdate);
router.delete("/houses/:code", HouseController.deleteHouse);
router.post('/uploads/:code/house', upload.single('file'), UploadImg.uploadImgHouse)

//Exportar ruta del archivo
module.exports = router;
