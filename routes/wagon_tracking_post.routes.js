const {Router} = require('express');
const routes = Router();

const quoteController = require('../controller/wagon_tracking_post.controller');

routes.post('/', quoteController.WagonTrackingPost);

module.exports = routes;
