const pool = require('../config/dbPool');
const {validationResult} = require('express-validator');

const quoteController = {};

quoteController.SendEmail = async(req,res) =>{
    try {
        const error = validationResult(req);

        if (!error.isEmpty()) {
            return await res.json({
                errors: error.array(),
                message: 'Некорректные данные'
            })
        }

        const {username,telephone,email} = req.body;

        if(
            username !== '' &&
            telephone !== '' &&
            email !== ''
        ) {
            await res.json({
                message: 'Заявка отправлена!'
            });
        }
        await res.json({
            message: 'failed',
        });

    } catch (err) {
        console.error(err.message);
    }
};

module.exports = quoteController;