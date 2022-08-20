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

router.get('/details/:id', async(req, res) => {
    const post = await postService.getOne(req.params.id);
    const fullName = `${post.author.firstName} ${post.author.lastName}`;

    let isValid = false;
    let isVote = post?.votes.some(u => req.user._id == u);

    if(post.author._id == req.user?._id) {
        isValid = true
    }

    res.render('posts/details', { ...post, fullName, isValid, isVote });
});

router.get('/voteUp/:id', async(req, res) => {
    const userId = req.user._id;
    const postId = req.params.id;
    await postService.incRating(userId, postId);
    res.redirect(`/posts/details/${req.params.id}`)
});

router.get('/voteDown/:id', async(req, res) => {
    const userId = req.user._id;
    const postId = req.params.id;
    await postService.decRating(userId, postId);
    res.redirect(`/posts/details/${req.params.id}`)
});

module.exports = router;