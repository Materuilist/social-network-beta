const { Schema, model, Types } = require("mongoose");
const { genders } = require("../constants");

const userSchema = new Schema({
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    sex: {
        type: String,
        enum: genders,
    },
    photos: [String],
    city: { type: Types.ObjectId, ref: "City" },
    phone: {
        type: String,
    },
    interests: [{ type: Types.ObjectId, ref: "Interest" }],
    friends: [
        {
            type: Types.ObjectId,
            ref: "User",
        },
    ],
    incomingRequests: [
        {
            type: Types.ObjectId,
            ref: "User",
        },
    ],
    outcomingRequests: [
        {
            type: Types.ObjectId,
            ref: "User",
        },
    ],
    chats: [{ type: Types.ObjectId, ref: "Chat" }],
});

module.exports = { User: model("User", userSchema) };
