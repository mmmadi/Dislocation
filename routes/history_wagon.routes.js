const {Router} = require('express');
const router = Router();

const quoteController = require('../controller/history_wagon.controller');

router.get('/:carnum', quoteController.HistoryWagon);

module.exports = router;