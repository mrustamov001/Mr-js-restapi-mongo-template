const { NotFoundError } = require("../../shared/errors");
const User = require("./User");

const removeUser = async ({ id }) => {
    const result = await User.findById(id);
    if (!result) throw new NotFoundError(`User ${id} does not exist`);

    return User.findByIdAndUpdate(
        id,
        {
            is_deleted: true,
            username: `${result.username}_${Date.now()}_DELETED`,
        },
        { new: true }
    ).select("-password -is_deleted");
};

module.exports = removeUser;
