const Post = require('../models/Post');

exports.createPost = async(postData) => Post.create(postData);
exports.getAll = async() => Post.find({}).lean();
exports.getOne = async(id) => Post.findById(id).populate('author').populate('votes');
exports.incRating = async(userId, postId) => Post.findByIdAndUpdate(postId, {
    $push: { votes: userId },
    $inc: { rating: 1 }
});
exports.decRating = async(userId, postId) => Post.findByIdAndUpdate(postId, {
    $push: { votes: userId },
    $inc: { rating: -1}
    },
    {
        runValidators: true
    }
);
exports.editPost = async(id, newData) => Post.findByIdAndUpdate(id, newData);
exports.deletePost = async(id) => Post.findByIdAndDelete(id);