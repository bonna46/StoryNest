const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


const UC = require('../controller/UserController');
const AC = require('../controller/AuthController');

router.post('/', AC.isValidUserPassFormat, AC.generateHashedPassword, UC.postUserInfo);

module.exports = router;