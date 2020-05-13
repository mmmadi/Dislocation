const pool = require('../config/dbPool');

const quoteController = {};

quoteController.HistoryWagon = async(req,res) =>{
    try {
        const {id_wagon} = req.params;
        const history_wagon = await pool.query(`select * from Caroperationhistory where id=$1 order by oper_date_last DESC`, [id_wagon]);
        await res.json(history_wagon.rows);
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = quoteController;