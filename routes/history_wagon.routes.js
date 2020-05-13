const {Router} = require('express');
const router = Router();

const quoteController = require('../controller/history_wagon.controller');

router.get('/:id_wagon', quoteController.HistoryWagon);

module.exports = router;