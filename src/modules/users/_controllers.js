const express = require("express");

const loginUser = require("./login-user");
const addUser = require("./add-User");
const listUsers = require("./list-Users");
const showUser = require("./show-User");
const edituser = require("./edit-User");
const removeUser = require("./remove-User");

const httpValidator = require("../../shared/http-validator");
const { ForbiddenError } = require("../../shared/errors");

const {
    loginUserSchema,
    addUserSchema,
    listUsersSchema,
    showUserSchema,
    editUserSchema,
    removeUserSchema,
} = require("./_schema");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postLoginUser = async (req, res, next) => {
    try {
        httpValidator({ body: req.body }, loginUserSchema);

        const result = await loginUser(req.body);

        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postUser = async (req, res, next) => {
    try {
        httpValidator({ body: req.body }, addUserSchema);

        const result = await addUser(req.body);

        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getUsers = async (req, res, next) => {
    try {
        httpValidator({ query: req.query }, listUsersSchema);

        const result = await listUsers(req.query);

        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getUser = async (req, res, next) => {
    try {
        httpValidator({ params: req.params }, showUserSchema);

        const result = await showUser(req.params);

        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const patchUser = async (req, res, next) => {
    try {
        httpValidator({ params: req.params, body: req.body }, editUserSchema);

        if (req.user.id == req.params.id)
            throw new ForbiddenError(`Super_admin cannot edit his profile`);

        const result = await edituser({ id: req.params.id, ...req.body });

        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const deleteUser = async (req, res, next) => {
    try {
        httpValidator({ params: req.params }, removeUserSchema);

        if (req.user.id == req.params.id)
            throw new ForbiddenError(`Super_admin cannot delete his profile`);

        const result = await removeUser({ id: req.params.id });

        res.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    postLoginUser,
    postUser,
    getUsers,
    getUser,
    patchUser,
    deleteUser,
};
