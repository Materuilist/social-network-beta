const { Schema, model, Types } = require("mongoose");

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
    },
    birthDate: {
        type: Date,
    },
    isOnline: Boolean,
    city: { type: Types.ObjectId, ref: "City" },
    career: {
        education: String,
        occupation: String,
    },
    photos: [
        {
            id: Number,
            data: String,
            likesFrom: [{ type: Types.ObjectId, ref: "User" }],
        },
    ],
    interests: [{ type: Types.ObjectId, ref: "Interest" }],

    //friends
    friends: [
        {
            data: {
                type: Types.ObjectId,
                ref: "User",
            },
            statuses: [
                {
                    type: Types.ObjectId,
                    ref: "Status",
                },
            ],
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
