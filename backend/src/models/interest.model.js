const { Schema, model, Types } = require("mongoose");

const interestSchema = new Schema({
    naming: { type: String, required: true },
});

module.exports = { Interest: model("Interest", interestSchema) };
