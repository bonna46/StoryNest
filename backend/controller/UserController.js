const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
var json2xml = require('json2xml');
var json2html = require('json2html');



const UserSchema = require('../model/UserSchema');
const { json } = require('body-parser');

const UserController = {

    postUserInfo: async (req, res) => {
        const username = req.body.username;
        const password = req.password;

        try {
            await UserSchema.create({
                username,
                password
            });
            return res.status(201).send('User created successfully');

        } catch (error) {
            if (error.code === 11000) { //duplicate key
                 return res.status(409).send('Username already in use');
            }
            //throw error;
            return res.status(404).send('User not created');
        }

    },
    resFormat: (req, res) => {
        const users = req.body;
        if (req.headers.accept === 'text/html') {

             /*
                let template = {'<>': 'li', 'html':[
                    {"<>":"span",'text':'id: ${id} '},
                        {"<>":"span",'text':'author: ${author} '},
                        {"<>":"span",'text':'title: ${title} '},
                        {"<>":"span",'text':'story: ${story} '}
                ] };
                let jk = json2html.render(users, template);
                 res.send(jk);
                 */
            var htmlResult = "";
            htmlResult += "<div>";
            for (var i in users) {
                var v = users[i];
                htmlResult += "<li>";
                htmlResult += "<p>" + "_id: " + v._id + "</p>";
                htmlResult += "<p>" + "author: " + v.author + "</p>";
                htmlResult += "<p>" + "title: " + v.title + "</p>";
                htmlResult += "<p>" + "story: " + v.story + "</p>";
                htmlResult += "</li>";
            }
            htmlResult += "<div>";
            res.status(200).send(htmlResult);
        }
        else if (req.headers.accept === 'text/csv') {
            var csvResult = "";
            for (var i in users) {
                var v = users[i];
                csvResult += "_id: " + v._id + ",";
                csvResult += "author: " + v.author + ",";
                csvResult += "title: " + v.title + ",";
                csvResult += "story: " + v.story;
                csvResult += "\n";
            }
            res.status(200).send(csvResult);
        }
        else if (req.headers.accept === 'application/xml') {
            const ex1 = JSON.stringify(users);
            const jsonobj = JSON.parse(ex1);
            const jk = json2xml(jsonobj);
            res.status(200).send(jk);
        }
        else {
            res.status(200).send(users);
        }

    }

}

module.exports = UserController;