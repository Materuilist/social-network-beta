const { Schema, model, Types } = require("mongoose");

const statusSchema = new Schema({
    name: { type: String, required: true },
});

module.exports = { Status: model("Status", statusSchema) };
