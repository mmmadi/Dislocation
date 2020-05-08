var CronJob = require('cron').CronJob;
const pool = require('./config/dbPool');
const parseString = require('xml2js').parseString;
const fetch = require('node-fetch');

const url = "https://www.railwagonlocation.com/xml/export.php?name=petroleumpark_xml&password=6Ksfu9gn3&request_type=view_vagon&vagon_no=51575819";

module.exports = () => {
    const job = new CronJob('* * * * *', async function () {
        try {
            const data = await fetch(url, {
                method: 'GET',
                headers: {'Content-Type': 'application/xml'}
            });

            const response = await data.text();

            parseString(response, async function (err, result) {

                const carnum = result.data.vagon[0].vagon_info[0].vagon_no;

                const datetime = new Date();

                const addWagon = await pool.query("insert into Test (carnumber, date_ins) values ($1,$2)", [carnum.toString(), datetime]);
            });

        } catch (e) {
        }
    });
job.start();
};

