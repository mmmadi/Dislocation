const {Router} = require('express');
const router = Router();

const quoteController = require('../controller/rem_fr_track.controller');

router.post('/:wagon_ids', quoteController.RemoveFromTracking);

module.exports = router;