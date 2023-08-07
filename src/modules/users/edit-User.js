const { NotFoundError } = require("../../shared/errors");
const User = require("./User");

const edituser = async ({ id, ...data }) => {
    const existing = await User.findById(id);
    if (!existing) throw new NotFoundError(`User ${id} does not exist`);

    return User.findByIdAndUpdate(id, data, { new: true });
};

module.exports = edituser;
