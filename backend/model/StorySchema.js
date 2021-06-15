const mongoose = require('mongoose');
const storySchema = new mongoose.Schema({
    author:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    story:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

module.exports = StorySchema = mongoose.model('poststory', storySchema);