const express = require("express");
const isLoggedIn = require("../../shared/auth/is-loggedin");
const hasRole = require("../../shared/auth/has-role");

const {
    postLoginUser,
    postUser,
    getUsers,
    getUser,
    patchUser,
    deleteUser,
} = require("./_controllers");

const router = express.Router();

const postUser_MiddleWare = [isLoggedIn, hasRole(["superAdmin"])];
const getUsers_MiddleWare = [isLoggedIn, hasRole(["superAdmin", "admin"])];
const getUser_MiddleWare = [isLoggedIn, hasRole(["superAdmin", "admin"])];
const patchUser_MiddleWare = [isLoggedIn, hasRole(["superAdmin"])];
const deleteUser_MiddleWare = [isLoggedIn, hasRole(["superAdmin"])];

router.post("/login", postLoginUser);
router.post("/users", postUser_MiddleWare, postUser);
router.get("/users", getUsers_MiddleWare, getUsers);
router.get("/users/:id", getUser_MiddleWare, getUser);
router.patch("/users/:id", patchUser_MiddleWare, patchUser);
router.delete("/users/:id", deleteUser_MiddleWare, deleteUser);

module.exports = router;
