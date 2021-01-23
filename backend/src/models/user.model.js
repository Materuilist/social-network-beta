const { Schema, model, Types } = require("mongoose");
const { genders } = require("../constants");

const userSchema = new Schema({
    //user-info
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: String,
    sex: {
        type: String,
        enum: genders,
    },
    birthDate: {
        type: Date,
    },
    isOnline: Boolean,
    photos: [String],
    city: { type: Types.ObjectId, ref: "City" },
    interests: [{ type: Types.ObjectId, ref: "Interest" }],

    //friends
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

    //chats
    chats: [{ type: Types.ObjectId, ref: "Chat" }],
});

module.exports = { User: model("User", userSchema) };
