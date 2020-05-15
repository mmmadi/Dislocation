const pool = require('../config/dbPool');

const quoteController = {};

quoteController.GetDislocation = async (req, res) => {
    try{
        const {userId} = req.body;

        const dislocation = await pool.query("select * from get_dislocation where user_id = $1", [userId]);

        await res.json(dislocation.rows);

    }catch (e) {}
};

module.exports = quoteController;