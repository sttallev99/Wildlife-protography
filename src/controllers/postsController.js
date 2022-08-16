const router = require('express').Router();

const postService = require('../services/postService');

router.get('/', async(req, res) => {
    const posts = await postService.getAll();
    res.render('posts/all-posts', { posts });
});

router.get('/create', async(req, res) => {
    res.render('posts/create');
});

router.post('/create', async(req, res) => {
    const newPost = {
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        dateOfCreation: req.body.dateOfCreation,
        image: req.body.image,
        description: req.body.description,
        author: req.user._id
    }
    await postService.createPost(newPost);

    res.redirect('/posts')
});

module.exports = router;