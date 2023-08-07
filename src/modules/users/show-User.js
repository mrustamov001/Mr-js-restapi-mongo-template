const { NotFoundError } = require("../../shared/errors");
const User = require("./User");

const showUser = async ({ id }) => {
    const result = await User.findById(id);
    if (!result) throw new NotFoundError(`User ${id} not found`);

    return result;
};

module.exports = showUser;
