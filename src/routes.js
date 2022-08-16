const routes = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const postsController = require('./controllers/postsController');

routes.use(homeController);
routes.use(authController);
routes.use('/posts', postsController);

module.exports = routes