const config = require('../config/config');
const pool = require('../config/dbPool');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

const quoteController = {};

quoteController.GetUsers = async (req, res) => {
    try{
        const users = await pool.query("select u.id,u.username,u.email,r.role_name from Users u left join Roles r on r.id = u.role_id order by u.id");

        if(users.rowCount>0){
            await res.json(users.rows);
        }
    }catch (e) {
        await res.json(e.message);
    }
};

quoteController.UpdateUser = async (req, res) => {
    try{
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return res.status(400).json({
                errors: error.array(),
                message: 'Некорректные данные при редактировании'
            })
        }

        const {username, email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 12); //хэширование пароля с солью 12

        const candidate = await pool.query("SELECT * FROM Users WHERE email = $1", [email]);

        if (candidate.rowCount > 0) {
            return res.status(400).json({message: 'Такой пользователь уже существует'});
        }

        const updateUser = await pool.query("update Users set username = $1, email = $2, password = $3 where id = $4", [username, email, hashedPassword, req.params.id]);

        await res.json({message: 'Пользователь отредактирован '});

    }catch (e) {
        await res.json({message:e.message});
    }
};

quoteController.DeleteUser = async (req, res) => {
    try{
        const deleteUser = await pool.query("delete from Users where id = $1", [req.params.id]);

        await res.json({message: 'Пользователь удалён!'})
    }catch (e) {
        await res.json({message:e.message})
    }
};

module.exports = quoteController;