const router = require('express').Router();

const postService = require('../services/postService');

router.get('/', (req, res) => {
    res.render('posts/all-posts');
});

router.get('/create', (req, res) => {
    res.render('posts/create');
});

module.exports = router;