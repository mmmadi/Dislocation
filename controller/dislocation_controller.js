const pool = require('../config/dbPool');

const quoteController = {};

quoteController.GetDislocation = async (req, res) => {
    try{
        const dislocation = await pool.query("select * from get_dislocation");

        await res.json(dislocation.rows);

    }catch (e) {}
};

module.exports = quoteController;