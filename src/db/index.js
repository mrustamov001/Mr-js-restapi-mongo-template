const mongoose = require("mongoose");
const config = require("../shared/config");

module.exports = function () {
    return mongoose
        .connect(`mongodb://${config.db.host}/${config.db.name}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log(`Connect to Mongoose`);
        })
        .catch((error) => {
            console.log(`Error connecting to Mongo Mongoose: ${error}`);
        });
};
