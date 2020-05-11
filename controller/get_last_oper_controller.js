const pool = require('../config/dbPool');
const parseString = require('xml2js').parseString;
const fetch = require('node-fetch');

const quoteController = {};

const url = "https://www.railwagonlocation.com/xml/export.php?name=petroleumpark_xml&password=6Ksfu9gn3&request_type=get_user_vagons&all_operations=n&group_id=39896&added_last_minutes=";
const url1 = "https://www.railwagonlocation.com/xml/export.php?name=petroleumpark_xml&password=6Ksfu9gn3&request_type=get_user_vagons&all_operations=n&group_id=&added_last_minutes=";


quoteController.GetData = async (req, res) => {
    try{
        const data = await fetch(url1,{
            method: 'GET',
            headers: {'Content-Type': 'application/xml'}
        });

        const response = await data.text();

        parseString(response, async function (err, result) {

            const datetime = new Date();

            for(var i = 0; i < response.length; i++){
                const carnum = result.data.vagon[i].vagon_info[0].vagon_no[0];
                const codestfrom = result.data.vagon[i].position[0].from_station[0].station_code[0];
                const codestdest = result.data.vagon[i].position[0].to_station[0].station_code[0];
                const departure_date = result.data.vagon[i].vagon_info[0].send_date[0];
                const codestcurrent = result.data.vagon[i].position[0].current_position_code[0];
                const oper_date_last = result.data.vagon[i].position[0].current_position_date[0];
                const codeoper = result.data.vagon[i].position[0].operation_asoup_code[0];
                const codecargo = result.data.vagon[i].position[0].etsng_code[0];

                const addWagon = await pool.query(
                    "insert into dislocation (" +
                        "carnumber, " +
                        "codestfrom, " +
                        "codestdest, " +
                        "departure_date, " +
                        "codestcurrent, " +
                        "oper_date_last, " +
                        "codeoper, " +
                        "codecargo, " +
                        "date_ins" +
                    ") values ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
                    [
                        carnum.toString(),
                        codestfrom.toString(),
                        codestdest.toString(),
                        departure_date.toString(),
                        codestcurrent.toString(),
                        oper_date_last.toString(),
                        codeoper.toString(),
                        codecargo.toString(),
                        datetime
                    ]);
            }

            await res.json({message: 'success'});
        });

    }catch (e) {}
};

module.exports = quoteController;