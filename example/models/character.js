const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    name: String,
    first_appearance: Date,
    last_appearance: Date,
    image: String,
    summary: String
});

module.exports = mongoose.model("Character", CharacterSchema);
