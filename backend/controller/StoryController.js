const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


const UserSchema = require('../model/UserSchema');
const StorySchema = require('../model/StorySchema');
const { json } = require('body-parser');

const StoryController = {
    getAllStories: async (req, res, next) => {
        const users = await StorySchema.find();
        if (!users)
            return res.status(404).send('This user doesnot exist');

        req.body = users;
        next();
    },
    getOneStory: async (req, res, next) => {
        const id = req.params.id;
        try {
            const user = await StorySchema.findById(id);
            if (!user) return res.status(404).send('Story not found');
            req.body = user;
            next();

        } catch {
            return res.status(400).send('Invalid storyid');
        }

    },
    postStory: async (req, res) => {
        const { author, title, story } = req.body;
        let user = {};
        if (title === undefined || story === undefined) return res.status(404).send('Include title and story');
        user.author = author;
        user.title = title;
        user.story = story;
        let storyModel = new StorySchema(user); //saving in database
        try {
            const newstory = await storyModel.save();
            //await StorySchema.save(user);
            return res.status(201).send({status: 'Story created successfully', storyInfo: newstory});
        }
        catch (error) {
            return res.status(400).send('Story not saved in database');
        }
    },
    updateStory: async (req, res) => {

        const sameUser = req.body.user1;
        const reqUser = req.body.user2;
        if (reqUser.newtitle !== undefined) sameUser.title = reqUser.newtitle;
        if (reqUser.newstory !== undefined) sameUser.story = reqUser.newstory;

        try {
            await StorySchema.updateMany(
                { _id: sameUser._id },
                {
                    $set: { title: sameUser.title, story: sameUser.story }
                }
            )
            res.status(200).send('Story updated');
        } catch (error) {
            return res.status(400).send('Not able to update');
        }

    },
    deleteStory: async (req, res) => {
        const sameUser = req.body.user1;
        try {
            await StorySchema.deleteOne(
                { _id: sameUser.id }
            )
            res.status(200).send('Story deleted');

        } catch (error) {
            return res.status(400).send('Not able to delete');
        }
    }
}

module.exports = StoryController;