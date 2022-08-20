const Post = require('../models/Post');

exports.createPost = async(postData) => Post.create(postData);
exports.getAll = async() => Post.find({}).lean();
exports.getOne = async(id) => Post.findById(id).populate('author').lean();
exports.incRating = async(userId, postId) => Post.findByIdAndUpdate(postId, {
    $push: { votes: userId },
    $inc: { rating: 1 }
});