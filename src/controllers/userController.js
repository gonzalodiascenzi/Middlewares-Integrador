const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const readJson = require("../helpers/readJson");
const writeJson = require("../helpers/writeJson");
const generateId = require("../helpers/generateId");
///////////////////////////////////////////////////////////
module.exports = {
    showRegister: (req, res) => {
        return res.render('user/user-register-form');
    },
    processRegister: (req, res) => {
    
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.render('user/user-register-form', {
                error: error.error,
                old: req.body
            });
        }  
        const user = {
            id: generateId(),
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: req.files[0].filename
        }
        
        writeJson(user);
        res.redirect('/user/login');
    },
    
    showLogin: (req, res) => {
        return res.render('user/user-login-form');
    },
    
    processLogin: (req, res) => {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.render('user/user-login-form', {
                error: error.error,
                old: req.body
            });
        }
        
        const userFound = readJson().find( user => user.email == req.body.email)
        req.session.user = userFound;
        if (req.body.remember) {
            res.cookie('user', userFound.id, { maxAge: 24 * 3600000 }) //Cookie de 24 horas
        }
        return res.redirect('/');
    },
    
    showProfile: (req, res) => {
        return res.render('user/profile');
    },

    logout: (req, res) => {  
        req.session.destroy();
        if (req.cookies.user) {
            res.clearCookie('user');
        }
        return res.redirect('/');
    }

}