const pool = require('../config/dbPool');

const quoteController ={};

quoteController.Wagon_Search = async(req, res) =>{
    try {
        const {carnum} = req.params;
        const wagon_search = await pool.query('select * from dislocation where carnumber=$1', [carnum]);        
        await res.json(wagon_search.rows);
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = quoteController;