const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const router = Router();

const quoteController = require('../controller/auth_controller');

router.get('/', quoteController.Test);
router.get('/get_roles', quoteController.Get_Roles);
router.post(
    '/register',
    [
        check('username', 'Некорректные данные').exists(),
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min:6}),
    ],
    quoteController.Registr);

router.post(
    '/login',
    [
        check('email', 'Некорректный email или пароль').normalizeEmail().isEmail(),
        check('password', 'Некорректный email или пароль').exists()
    ],
    quoteController.Login);

module.exports = router;
