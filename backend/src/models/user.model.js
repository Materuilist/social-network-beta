const { Schema, model, Types } = require("mongoose");
const { genders, statuses } = require("../constants");

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
    city: { type: Types.ObjectId, ref: "City" },
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
                    ref: 'Status',
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
