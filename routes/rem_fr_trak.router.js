const {Router} = require('express');
const router = Router();

const quoteController = require('../controller/rem_fr_track.controller');

router.post('/', quoteController.RemoveFromTracking);

module.exports = router;