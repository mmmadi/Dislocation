const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');

const quoteController = require('../controller/user_controller');

router.get('/', quoteController.GetUsers);

router.put('/:id',
    [
        check('username', 'Некорректные данные').exists(),
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min:6}),
    ],
    quoteController.UpdateUser
    );

router.delete('/:id', quoteController.DeleteUser);

module.exports = router;