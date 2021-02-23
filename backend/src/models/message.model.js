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
    timestamp: Date,
});

module.exports = { Message: model("Message", messageSchema) };
