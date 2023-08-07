const { hashSync } = require("bcryptjs");
const User = require("./User");

const addUser = async (data) => {
    const hashedPassword = await hashSync(data.password, 10);
    const result = await User.create({ ...data, password: hashedPassword });

    return result;
};

module.exports = addUser;
