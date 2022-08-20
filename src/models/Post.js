const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    keyword: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    dateOfCreation: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    votes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    rating: {
        type: Number,
        default: 0
    }
});

postSchema.method('getNames', function() {
    return this.votes.map(x => x.email).join(', ');
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;