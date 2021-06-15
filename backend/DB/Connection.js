const mongoose = require('mongoose');
require('dotenv').config();
const D_URI= "mongodb+srv://dbUser:dbUser@cluster0.gdowu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//const DB_URI="mongodb://dbUser:dbUser@localhost:27017";
//const DB_URI= process.env.MONGO_CONNECTION_STRING;
//const DB_URI = process.env.NODE_ENV === 'server' ? process.env.URI : process.env.MOCK_URI;
const DB_URI= D_URI;
const connectDB = async()=> {
    await mongoose.connect(DB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
     });
    console.log('db connected..!');
}

module.exports = connectDB;