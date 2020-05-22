const pool = require('../config/dbPool');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const parseString = require('xml2js').parseString;
const url2 = "https://www.railwagonlocation.com/xml/export.php?name=petroleumpark_xml&password=6Ksfu9gn3&request_type=view_vagon&vagon_no=54655832";

const quoteController = {};

quoteController.Test = async (req, res) => {
        try{

            await res.json({message:'test api'})

        } catch (e) {

        }
};

quoteController.Get_Roles = async (req, res) => {
    try {
        const roles = await pool.query("select id as key, role_name as value from Roles");

        res.json(roles.rows);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
};

quoteController.Registr = async (req, res) => {
    try {
        const error = validationResult(req); //валидация ошибок из запроса req

        if (!error.isEmpty()) {
            return res.status(400).json({
                errors: error.array(),
                message: 'Некорректные данные при регистрации'
            })
        }

        const {username, email, password, role} = req.body; //данные поступающие из клиента
        const roleId = parseInt(role, 10);
        const hashedPassword = await bcrypt.hash(password, 12); //хэширование пароля с солью 12

        //проверка
        const candidate = await pool.query("SELECT * FROM Users WHERE email = $1", [email]);

        if (candidate.rowCount > 0) {
            return res.status(400).json({message: 'Такой пользователь уже существует'});
        }

        const newUser = await pool.query("INSERT INTO Users (username,email,password,role_id) " +
            "VALUES ($1,$2,$3,$4)", [username, email, hashedPassword, roleId]);

        res.status(201).json({message: 'Пользователь создан'});
    } catch (e) {
        res.status(500).json({message: e.message}) //возврат сообщения клиенту
    }
};

quoteController.Login = async (req, res) => {
    try {
        const error = validationResult(req); //валидация ошибок из запроса req

        if (!error.isEmpty()) {
            return res.status(400).json({
                errors: error.array(),
                message: 'Некорректные данные при входе'
            })
        }

        const {email, password} = req.body; //получаем данные из клиента

        const user = await pool.query("select * from Users where email = $1", [email]);

        if (user.rowCount === 0) {
            return res.status(400).json({message: 'Пользователь не найден'})
        }

        const isMatch = await bcrypt.compare(password, user.rows[0].password);

        if (!isMatch) {
            return res.status(400).json({message: 'Некорректный email или пароль'});
        }

        const token = jwt.sign(
            {userId: user.rows[0].id},
            config.jwtSecret,
            {expiresIn: '1h'}
        );
        await res.json({token, userId: user.rows[0].id, roleId: user.rows[0].role_id, username: user.rows[0].username});

    } catch (e) {
        res.status(500).json({message: e.message})
    }
};

module.exports = quoteController;