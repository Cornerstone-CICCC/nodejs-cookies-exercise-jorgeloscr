"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLoginAuth = exports.checkAuth = void 0;
const checkAuth = (req, res, next) => {
    const { authToken } = req.signedCookies;
    if (authToken === 'admin123') {
        next();
    }
    else {
        res.redirect('/login');
    }
};
exports.checkAuth = checkAuth;
//check authoToken cookie for the login page
const checkLoginAuth = (req, res, next) => {
    const { authoToken } = req.signedCookies;
    if (authoToken === 'admin123') {
        res.redirect('/profile');
    }
    else {
        next(); // if not it will continue to the login page
    }
};
exports.checkLoginAuth = checkLoginAuth;
