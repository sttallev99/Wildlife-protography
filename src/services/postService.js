const Post = require('../models/Post');

exports.createPost = async(postData) => Post.create(postData);
exports.getAll = async() => Post.find({}).lean(); 