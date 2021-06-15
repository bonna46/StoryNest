const express = require('express');
const mongoose = require('mongoose');
const UserSchema = require('../model/UserSchema');
const router = express.Router();


const UC = require('../controller/UserController');
const AC = require('../controller/AuthController');


router.post('/', AC.isValidUser );



module.exports = router;