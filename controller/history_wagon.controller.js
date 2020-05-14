const pool = require('../config/dbPool');

const quoteController = {};

quoteController.HistoryWagon = async(req,res) =>{
    try {
        const {carnum} = req.params;
        const history_wagon = await pool.query('select * from get_history($1)', [carnum]);
        await res.json(history_wagon.rows);
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = quoteController;