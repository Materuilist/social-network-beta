const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    friends: [
        {
            type: Types.ObjectId,
            ref: "User",
            required: false,
        },
    ],
    incomingRequests: [
        {
            type: Types.ObjectId,
            ref: "User",
            required: false,
        },
    ],
    outcomingRequests: [
        {
            type: Types.ObjectId,
            ref: "User",
            required: false,
        },
    ],
});

module.exports = { User: model("User", userSchema) };
