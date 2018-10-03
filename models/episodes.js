const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EpisodeSchema = new Schema({
    image: String,
    title: String,
    summary: String
});

module.exports = mongoose.model("Episode", EpisodeSchema);
