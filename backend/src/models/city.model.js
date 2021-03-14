const { Schema, model, Types } = require("mongoose");

const citySchema = new Schema({
    name: { type: String, required: true },
});

module.exports = { City: model("City", citySchema) };
