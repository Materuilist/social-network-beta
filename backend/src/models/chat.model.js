const { Schema, model, Types } = require("mongoose");
const { chatTypes } = require("../constants");

const chatSchema = new Schema({
    naming: {
        type: String,
        required: true,
    },
    type: {
        type: Types.string,
        enum: chatTypes,
    },
    members: [
        {
            user: {
                type: Types.ObjectId,
                ref: "User",
                required: true,
            },
            needsNotification: Boolean,
        },
    ],
    admins: [{ type: Types.ObjectId, ref: "User" }],
    messages: [{ type: Types.ObjectId, ref: "Message" }],
});

module.exports = { Chat: model("Chat", chatSchema) };
