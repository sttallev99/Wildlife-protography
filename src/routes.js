const routes = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');

routes.use(homeController);
routes.use(authController);

module.exports = routes