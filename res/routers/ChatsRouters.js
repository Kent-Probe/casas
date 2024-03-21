const express = require('express');
const ChatController = require('../controllers/ChatController')
const MessageSchema = require('../models/Message')

const router = express.Router();

router.get('/messages', async (req, res) => {
    //Traer todos los usuarios
    let messages = await MessageSchema.find().populate('from').populate('to')    
    res.json(messages)
})

//Routers
/* router.get("/messages", ChatController.getMessages); */
router.post("/messages", ChatController.postMessage);

//Exportar ruta del archivo
module.exports = router;