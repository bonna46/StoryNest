const express = require('express');
const connectDB = require('./DB/Connection');
const app = express();
const path = require('path');
const routes= require('./route/Index');
const cors = require("cors");
require('dotenv').config();


connectDB();
app.use(cors());
app.use('/', express.static(path.join(__dirname, 'static')));
app.use(express.json({ extended: true }))

app.use(routes);

var port =  process.env.PORT  ;
//if(process.env.NODE_ENV === 'test') Port=5000;
app.listen(port,()=> console.log(`db connected..! ${port}`));
module.exports = app;
