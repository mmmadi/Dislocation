const {Router} = require('express');
const {check, validationResult} = require('express-validator');
// const bcrypt = require('bcryptjs');
// const config = require('../config/config');
// const jwt = require('jsonwebtoken');
const router = Router();
// const pool = require('../config/dbPool');

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
    quoteController.Login)

/*router.get('/test', async (req, res) => {
   try{
       const user = await pool.query("select * from Users where email = $1", ["admin@admin.com"]);

       if(user.rowCount > 0){
           const isMatch = await bcrypt.compare("123123", user.password);

           if(!isMatch){
               return res.status(400).json({message: 'Некорректный email или пароль'});
           }

           res.json(user.rows[0].role_id);
       }
       return res.status(400).json({message:'Пользователь не найден'})
   } catch (e) {}
});*/

/*// /api/auth/get_roles
router.get('/get_roles', async (req, res) => {
    try {
        const roles = await pool.query("select id as key, role_name as value from Roles");

        res.json(roles.rows);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
});*/

// /api/auth/register
/*router.post(
    '/register',
    [
        check('username', 'Некорректные данные').exists(),
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min:6}),
    ],
    async (req, res) => {
    try{
        const error = validationResult(req); //валидация ошибок из запроса req

        if(!error.isEmpty()){
            return res.status(400).json({
                errors:error.array(),
                message: 'Некорректные данные при регистрации'
            })
        }

        const {username, email, password, role} = req.body; //данные поступающие из клиента
        const roleId = parseInt(role,10);
        const hashedPassword = await bcrypt.hash(password, 12); //хэширование пароля с солью 12

        //проверка
        const candidate = await pool.query("SELECT * FROM Users WHERE email = $1", [email]);

        if(candidate.rowCount > 0){
            return res.status(400).json({message:'Такой пользователь уже существует'});
        }

        const newUser = await pool.query("INSERT INTO Users (username,email,password,role_id) " +
                                             "VALUES ($1,$2,$3,$4)", [username,email,hashedPassword,roleId]);

        res.status(201).json({message:'Пользователь создан'});
    }catch (e) {
        res.status(500).json({message: e.message}) //возврат сообщения клиенту
    }
});*/

/*// /api/auth/login
router.post(
    '/login',
    [
      check('email', 'Некорректный email или пароль').normalizeEmail().isEmail(),
      check('password', 'Некорректный email или пароль').exists()
    ],
    async (req, res) => {
    try{
        const error = validationResult(req); //валидация ошибок из запроса req

        if(!error.isEmpty()){
            return res.status(400).json({
                errors:error.array(),
                message: 'Некорректные данные при входе'
            })
        }

        const {email, password} = req.body; //получаем данные из клиента

        const user = await pool.query("select * from Users where email = $1", [email]);

        if(user.rowCount === 0){
            return res.status(400).json({message:'Пользователь не найден'})
        }

        const isMatch = await bcrypt.compare(password, user.rows[0].password);

        if(!isMatch){
            return res.status(400).json({message: 'Некорректный email или пароль'});
        }

        const token = jwt.sign(
            {userId: user.rows[0].id},
            config.jwtSecret,
            {expiresIn: '1h'}
            );
        res.json({ token, userId: user.rows[0].id, roleId: user.rows[0].role_id });

    }catch (e) {
        res.status(500).json({message: e.message})
    }
});*/

module.exports = router;
