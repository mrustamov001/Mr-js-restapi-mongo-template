const Joi = require("joi");

exports.loginUserSchema = {
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    }),
};

exports.listUsersSchema = {
    query: Joi.object({
        q: Joi.string(),
        page: Joi.object({
            offset: Joi.number().integer(),
            limit: Joi.number().integer().when("offset", {
                is: Joi.exist(),
                then: Joi.required(),
                otherwise: Joi.forbidden(),
            }),
        }),
        sort: Joi.object({
            by: Joi.string().valid("first_name", "last_name"),
            order: Joi.string().valid("asc", "desc"),
        }),
        filters: Joi.object({
            is_super: Joi.boolean(),
            is_deleted: Joi.boolean(),
        }),
    }),
};

exports.addUserSchema = {
    body: Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        username: Joi.string().required().min(4).max(16),
        password: Joi.string().required(),
    }),
};

exports.editUserSchema = {
    params: Joi.object({
        id: Joi.string().required(),
    }),
    body: Joi.object({
        first_name: Joi.string(),
        last_name: Joi.string(),
        username: Joi.string(),
        password: Joi.string(),
    }),
};

exports.removeUserSchema = {
    params: Joi.object({
        id: Joi.string().required(),
    }),
};

exports.showUserSchema = {
    params: Joi.object({
        id: Joi.string().required(),
    }),
};
