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
    const postData = post.toObject();
    const names = post.getNames();
    const fullName = `${post.author.firstName} ${post.author.lastName}`;
    let isValid = false;
    let votesId = postData.votes.map(v => v._id);
    let isVote = votesId.some(u => req.user._id == u);

    if(postData.author._id == req.user?._id) {
        isValid = true
    }


    res.render('posts/details', { ...postData, fullName, isValid, isVote, names });
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

router.get('/edit/:id', async(req, res) => {
    const postId = req.params.id;
    const post = await postService.getOne(postId);
    res.render('posts/edit', { ...post });
});

router.post('/edit/:id', async(req, res) => {
    const postId = req.params.id;
    const newData = {
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        dateOfCreation: req.body.dateOfCreation,
        image: req.body.image,
        description: req.body.description
    }
    await postService.editPost(postId, newData);

    res.redirect(`/posts/details/${req.params.id}`);
});

router.get('/delete/:id', async(req, res) => {
    await postService.deletePost(req.params.id);
    res.redirect('/posts');
});

module.exports = router;