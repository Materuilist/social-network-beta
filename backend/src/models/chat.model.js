const { Schema, model, Types } = require("mongoose");

const chatSchema = new Schema({
    members: [
        {
            _id: {
                type: Types.ObjectId,
                ref: "User",
                required: true,
            },
            needsNotification: Boolean,
        },
    ],
    messages: [{ type: Types.ObjectId, ref: "Message" }],
});

module.exports = { Chat: model("Chat", chatSchema) };
