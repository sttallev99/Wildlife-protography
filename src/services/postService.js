const Post = require('../models/Post');

exports.createPost = async(postData) => Post.create(postData);