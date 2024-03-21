const mongoose = require('mongoose')
const MessageSchema = require('../models/Message')

class ChatController {

    static getMessages = async (req, res) => {
        try {
            let messages = await MessageSchema.find().populate({
                path: 'from',
                select: '-password'
            }).populate({
                path: 'to',
                select: '-password'
            })
            res.json({
                status: "success",
                message: "Messages found successfuly",
                data: messages,
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "failed",
                message: "Error, messages not found",
            })
        }
    }

    static postMessage = async (req, res) => {
        let user = MessageSchema({
            body: req.body.body,
            from: req.body.from,
            to: req.body.to,
        }) 

        user.save().then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(501).json({
                status:'failed',
                message: "error while uploading message",
            })
        })
    }
}

module.exports = ChatController;