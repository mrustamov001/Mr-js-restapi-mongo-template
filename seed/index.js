const mongoose = require("mongoose");
const { hashSync } = require("bcryptjs");
const User = require("../src/modules/users/User");
const config = require("../src/shared/config");

mongoose
    .connect(`mongodb://127.0.0.1:27017/${config.db.name}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB ga ulandi.");
    })
    .catch((err) => {
        console.log("DB da xatolik: ", err);
    });

const seedUser = [
    {
        first_name: "Super Admin",
        last_name: "Admin",
        username: "superAdmin",
        password: hashSync("super1234", 10),
        is_super: true,
        is_deleted: false,
    },
];

const seedDB = async () => {
    await User.deleteMany({});
    await User.insertMany(seedUser);
};

seedDB().then(() => {
    mongoose.connection.close();
});
