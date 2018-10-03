const mongoose = require("mongoose");
// Mongoose Connection
const mongoUri =
    process.env.MONGODB_URI || "mongodb://localhost:27017/portlandia";
mongoose.connect(
    mongoUri,
    { useNewUrlParser: true }
);

module.exports = mongoose;
