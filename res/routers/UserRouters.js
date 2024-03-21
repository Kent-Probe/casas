//Modulos requeridos en el archivo
const express = require("express");
const multer = require('multer');

//Ruta del archivo
const router = express.Router();

//modulos del archivo
const UserController = require("../controllers/UserController.js");
const UploadImg = require("../controllers/UploadImg.js");

//clases
const userContrller = new UserController();

//multer
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'res/uploads/user/')
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
router.get("/user", UserController.getUsers);
router.get("/user/:id", userContrller.validateToken, UserController.getOneUser);
router.post("/user", UserController.userInsert);
router.patch("/user", UserController.userUpdate);
router.delete("/user/:id", UserController.deleteUser);
router.post("/login", UserController.login);
router.post('/uploads/:id/user', upload.single('file'), UploadImg.uploadImgUser)

//Exportar ruta del archivo
module.exports = router;
