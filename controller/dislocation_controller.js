const pool = require('../config/dbPool');

const quoteController = {};

quoteController.GetDislocation = async (req, res) => {
    try{
        const dislocation = await pool.query("select\n" +
            "\t\tid, carnumber, codestfrom,codestdest,\n" +
            "\t\tto_char(d.departure_date, 'DD.MM.YYYY') as departure_date,\n" +
            "\t\tcodestcurrent,\n" +
            "\t\tto_char(d.oper_date_last, 'DD.MM.YYYY HH:mm:ss') as oper_date_last,\n" +
            "\t\tcodeoper,codecargo,\n" +
            "\t\tto_char(d.date_ins, 'DD.MM.YYYY HH:mm:ss') as date_ins\n" +
            "\tfrom Dislocation d");

        await res.json(dislocation.rows);

    }catch (e) {}
};

module.exports = quoteController;