const { compare } = require("bcryptjs");
const { UnauthorizedError } = require("../../shared/errors");
const User = require("./User");
const jwt = require("jsonwebtoken");
const config = require("../../shared/config");

const loginUser = async ({ username, password }) => {
    const existing = await User.findOne({ username, is_deleted: false });
    if (!existing)
        throw new UnauthorizedError(`Unauthorized ${username} ${password}`);

    const match = await compare(password, existing.password);
    if (!match)
        throw new UnauthorizedError(`Unauthorized ${username} ${password}`);

    const token = jwt.sign(
        { user: { id: existing._id, is_super: existing.is_super } },
        config.jwt.secret,
        { expiresIn: "1d" }
    );

    return token;
};

module.exports = loginUser;
