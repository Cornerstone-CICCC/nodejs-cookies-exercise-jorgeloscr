"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const pageRouter = (0, express_1.Router)();
let userLogin;
userLogin = [
    { username: 'authToken', password: "admin123" },
    { username: 'guest', password: "guest123" }
];
pageRouter.get('/', auth_1.checkLoginAuth, (req, res) => {
    res.status(200).render("index");
});
pageRouter.get('/login', (req, res) => {
    res.status(200).render("login");
});
pageRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    const found = userLogin.find(user => user.username === username && user.password === password);
    if (found) {
        res.cookie('authToken', 'admin123', {
            maxAge: 3 * 60 * 100,
            httpOnly: true,
            signed: true
        });
        res.redirect('/profile');
    }
    else {
        res.redirect('/login');
    }
});
pageRouter.get('/profile', auth_1.checkAuth, (req, res) => {
    res.status(200).render('/profile');
});
pageRouter.get('/logout', (req, res) => {
    res.clearCookie("authToken");
    res.clearCookie("user_info");
    res.redirect("/");
});
exports.default = pageRouter;
