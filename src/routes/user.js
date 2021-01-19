const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/userController');
const validator = require('../middlewares/validator');
const authentication = require('../middlewares/authentication');
const invited = require('../middlewares/invited');
///////////////////////////////////////////////////////////

// Multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/users');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + ' - ' + file.originalname);
    }
})
const upload = multer({ 
    storage: storage
})

///////////////////////////////////////////////////////////

// Vista de registro

router.get('/register', invited, userController.showRegister);

// Procesar vista de registro
router.post('/register', upload.any(), invited, validator.register, userController.processRegister);

// Vista de login
router.get('/login', invited, userController.showLogin);

// Procesar vista de login
router.post('/login', invited, validator.login, userController.processLogin);

// Perfil del usuario
router.get('/profile', authentication, userController.showProfile);

// Cierra sesión
router.get('/logout', authentication, userController.logout);

module.exports = router;