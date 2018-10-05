const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    image: String,
    name: String,
    episodes: [{ type: Schema.Types.ObjectId, ref: "Episode" }]
});

module.exports = mongoose.model("Character", CharacterSchema);
