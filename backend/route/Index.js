const express = require('express');
const router= express.Router();
const mongoose = require('mongoose');

const routeLogin = require('./Login');
const routeRegister = require('./Register');
const routeStories = require('./Stories');
const app = express();
const cors = require("cors");


router.use('/api/login', routeLogin);
router.use('/api/register', routeRegister);
router.use('/api/stories', routeStories); 


module.exports = router;