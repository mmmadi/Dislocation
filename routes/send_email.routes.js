const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();

const quoteController = require('../controller/send_email_controller');

router.post(
    '/',
    [
        check('username','Некорректные данные').exists(),
        check('telephone', 'Некорректный номер').isNumeric(),
        check('email', 'Некорректный email').normalizeEmail().isEmail()
    ],
    quoteController.SendEmail);

module.exports = router;