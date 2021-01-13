const { Schema, model, Types } = require("mongoose");

const messageSchema = new Schema({
    sender: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    pics: [String], //base64
    isRead: Boolean,
    replyTo: [
        {
            type: Types.ObjectId,
            ref: "Message",
        },
    ],
});

module.exports = { Message: model("Message", messageSchema) };
