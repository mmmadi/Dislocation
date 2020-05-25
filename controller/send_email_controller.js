const pool = require('../config/dbPool');

const quoteController = {};

quoteController.SendEmail = async(req,res) =>{
    try {
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