const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const UC = require('../controller/UserController');
const AC = require('../controller/AuthController');
const SC = require('../controller/StoryController');


router.get('/', SC.getAllStories, UC.resFormat);
router.get('/:id', SC.getOneStory, UC.resFormat);
router.post('/', AC.verifyBearerToken, AC.getAuthor,SC.postStory);
router.put('/:id', AC.verifyBearerToken , AC.verifySameUser, SC.updateStory);
router.delete('/:id', AC.verifyBearerToken ,AC.verifySameUser, SC.deleteStory);

module.exports = router;