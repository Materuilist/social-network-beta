const { Schema, model, Types } = require("mongoose");

const interestSchema = new Schema({
    naming: { type: String, required: true },
    owner: { type: Types.ObjectId, ref: "User" }, //кастомные интересы, их не следует показывать всем юзерам
});

module.exports = { Interest: model("Interest", interestSchema) };
