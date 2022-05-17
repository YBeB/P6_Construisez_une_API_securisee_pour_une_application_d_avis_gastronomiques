const express = require('express');
const router = express.Router();
//Permet d'avoir un mot de passe complexe
const password=require("../middleware/password");
const userCtrl = require('../controllers/user');
//Route pour l'inscription et le login
router.post('/signup',password,userCtrl.signup)
router.post('/login', userCtrl.login)

module.exports = router