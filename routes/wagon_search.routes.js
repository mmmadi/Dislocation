const {Router} = require('express');
const router = Router();

const quoteController = require('../controller/wagon_search.controller');

router.get('/:carnum', quoteController.Wagon_Search);

module.exports = router;