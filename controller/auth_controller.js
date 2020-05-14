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
            const data = await fetch(url2,{
                method: 'GET',
                headers: {'Content-Type': 'application/xml'}
            });

            const response = await data.text();

            parseString(response, async function (err, result) {
                    const carnum = result.data.vagon[0].vagon_info[0].vagon_no[0];
                    const codestfrom = result.data.vagon[0].position[0].from_station[0].station_code[0];
                    const codestdest = result.data.vagon[0].position[0].to_station[0].station_code[0];
                    const departure_date = result.data.vagon[0].vagon_info[0].send_date[0];
                    const codestcurrent = result.data.vagon[0].position[0].current_position_code[0];
                    const oper_date_last = result.data.vagon[0].position[0].current_position_date[0];
                    const codeoper = result.data.vagon[0].position[0].operation_asoup_code[0];
                    const codecargo = result.data.vagon[0].position[0].etsng_code[0];

                    const owner_name = result.data.vagon[0].vagon_info[0].vagon_specifications[0].owner;
                    const owner_code = result.data.vagon[0].vagon_info[0].vagon_specifications[0].owner_code;
                    const owner_okpo = result.data.vagon[0].vagon_info[0].vagon_specifications[0].owner_okpo;

                    const operator_name = result.data.vagon[0].vagon_info[0].vagon_specifications[0].operator;
                    const operator_okpo = result.data.vagon[0].vagon_info[0].vagon_specifications[0].operator_okpo;
                    const weight = result.data.vagon[0].position[0].weight;

                    const gruz_sender_code = result.data.vagon[0].position[0].gruz_sender;
                    const gruz_sender_okpo = result.data.vagon[0].position[0].gruz_sender_okpo;
                    const gruz_sender_name = result.data.vagon[0].position[0].gruz_sender_name;

                    const gruz_receiver_code = result.data.vagon[0].position[0].gruz_receiver;
                    const gruz_receiver_okpo = result.data.vagon[0].position[0].gruz_receiver_okpo;
                    const gruz_receiver_name = result.data.vagon[0].position[0].gruz_receiver_name;


                   await res.json(result);
            })

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
        res.json({token, userId: user.rows[0].id, roleId: user.rows[0].role_id});

    } catch (e) {
        res.status(500).json({message: e.message})
    }
};

module.exports = quoteController;
