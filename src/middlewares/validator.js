const path = require('path');
const { body } = require('express-validator');
const bcrypt = require('bcryptjs');
const readJson = require('../helpers/readJson');
/////////////////////////////////////////////
module.exports = {
    register: [
        body('email')
            .notEmpty().withMessage("Complete el campo email")
                .bail()
            
            .isEmail().withMessage("El campo ingresado no es valido")
                .bail()
            
            .custom(emailValue => {
                const users = readJson();
                const userExists = users.find(user => user.email == emailValue);
                return !userExists;
            }).withMessage("Email ya registrado"),
        
        body('password')
            .notEmpty().withMessage("Campo password vacio").bail()
            
            .isLength({ min: 6 }).withMessage("Ingrese un minimo de 6 caracteres").bail()
            
            .custom((passwordValue, { req }) => passwordValue == req.body.retype).withMessage("Contraseñas no coinciden"), body('retype')
            
            .notEmpty().withMessage("Complete el campo retype password"),body('avatar')
             
            .custom((avatarValue, { req }) => req.files[0]).withMessage('Avatar obligatorio').bail()
            
            .custom((avatarValue, { req }) => {
                const validExtensions = ['.png', '.jpg'];
                const fileExt = path.extname(req.files[0].originalname);
                return validExtensions.includes(fileExt);
            }).withMessage("Extension invalida. ['png' o 'jpg']")
    ],
    login: [
        body('email')
            .notEmpty().withMessage("Campo email vacio").bail()
            
            .isEmail().withMessage("Campo ingresado invalido").bail()
            
            .custom( (emailValue, { req }) => {
                const users = readJson();
                const userFound = users.find(user => user.email == emailValue)
                if (userFound) {
                    if (userFound.email == emailValue && bcrypt.compareSync(req.body.password, userFound.password)) {
                        return true;
                    }
                    return false
                }
                return false;
            }).withMessage("Usuario y password sin coincidencia")
    ]
}