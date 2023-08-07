const { ForbiddenError } = require("../errors");

const hasRole = (roles) => {
    return (req, res, next) => {
        const role = req.user;

        role.is_super = role.is_super ? "superAdmin" : "admin";

        if (!roles.includes(role.is_super))
            throw new ForbiddenError("Forbidden");

        next();
    };
};

module.exports = hasRole;
