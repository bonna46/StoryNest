const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'huwfkwjfiekeuhejfnvihnehjjeo%$^&$#@&^%&%^&%&%^#Wwjdhufeirhuehnhnebv';

const UserSchema = require('../model/UserSchema');
const StorySchema = require('../model/StorySchema');


const AuthController = {
    isValidUserPassFormat: (req, res, next) => {
        const { username, password: plainTextPassword } = req.body;
        if (username === undefined || plainTextPassword === undefined)
            return res.status(401).send('Include proper username and password');
        
        if (plainTextPassword.length < 5) 
            return res.status(400).send('Length should be at least 5');
        
        //res.status=200;
        next();
    },
    generateHashedPassword: async (req, res, next) => {

        const plainTextPassword = req.body.password;
        req.password = await bcrypt.hash(plainTextPassword, 10);
        next();
    },
    //Username exist in database or not
    isValidUser: async (req, res, next) => {

        const { username, password } = req.body;

        try { 
            if (username === undefined || password === undefined)
                return res.status(401).send('Include proper username and password');
            
                const user = await UserSchema.findOne({ username });
            if (!user) {
                return res.status(401).send('This user doesnot exist');
            }
           
            if (await bcrypt.compare(password, user.password)) {
                
                const token = jwt.sign({
                    id: user._id,
                    username: user.username
                },
                    JWT_SECRET
                );
                //token takes data(to store) and secret key
                return res.status(200).send({ status: 'User validated', data: token });
            }
            return res.status(403).send('Invalid username or password');
        }
        catch (err) { 
           return res.status(404).send(err);
        };
    },

    verifyBearerToken: (req, res, next) => {
        const bearerheader = req.headers['authorization'];

        if (bearerheader) {
            const bearer = bearerheader.split(' ');
            const token = bearer[1];
            req.token = token;
            next();
        }
        else {
            return res.status(403).send('User is forbidden to edit');
        }
    },

    getAuthor: (req, res, next) => {
        try {
            const userverify = jwt.verify(req.token, JWT_SECRET);
            const author = userverify.username;
            req.body.author = author;
            next();

        } catch (error) {
            return res.status(400).send('Token is not valid');
        }
    },
    verifySameUser: async (req, res, next) => {
        const reqUser = req.body;
        const id = req.params.id;
        const token = req.token;

        try {
            const user = jwt.verify(token, JWT_SECRET);
            const tokenUsername = user.username;
            const storyUser = await StorySchema.findById(id);
            if (storyUser.author === tokenUsername) {
                req.body.user1 = storyUser;
                req.body.user2 = reqUser;
                next();
            }
            else {
                return res.status(403).send('User hasnot permission to edit');
            }
        }
        catch (error) {
            return res.status(404).send('Story not found');
        }
    }
}


module.exports = AuthController;