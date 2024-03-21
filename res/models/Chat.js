const mongoose = require("mongoose");
const MessageSchema = require('./Message')
const UserSchema = require('./User')

const ChatSchema = new mongoose.Schema(
    {
        from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
        message: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            }],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Chat", ChatSchema);
