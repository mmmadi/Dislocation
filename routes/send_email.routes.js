const {Router} = require('express');
const router = Router();

const quoteController = require('../controller/send_email_controller');

router.post('/', quoteController.SendEmail);

module.exports = router;