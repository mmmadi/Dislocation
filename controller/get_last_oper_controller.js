const pool = require('../config/dbPool');
const parseString = require('xml2js').parseString;
const fetch = require('node-fetch');

const quoteController = {};

const url = "https://www.railwagonlocation.com/xml/export.php?name=petroleumpark_xml&password=6Ksfu9gn3&request_type=get_user_vagons&all_operations=n&group_id=39896&added_last_minutes=";
const url1 = "https://www.railwagonlocation.com/xml/export.php?name=petroleumpark_xml&password=6Ksfu9gn3&request_type=get_user_vagons&all_operations=n&group_id=&added_last_minutes=";
const url2 = "https://www.railwagonlocation.com/xml/export.php?name=petroleumpark_xml&password=6Ksfu9gn3&request_type=view_vagon&vagon_no=50075936";

quoteController.GetData = async (req, res) => {
    try{
        const data = await fetch(url1,{
            method: 'GET',
            headers: {'Content-Type': 'application/xml'}
        });

        const response = await data.text();

        parseString(response, async function (err, result) {

            const datetime = new Date();

            for(let i = 0; i < response.length; i++){
                const carnum = result.data.vagon[i].vagon_info[0].vagon_no[0];
                const codestfrom = result.data.vagon[i].position[0].from_station[0].station_code[0];
                const codestdest = result.data.vagon[i].position[0].to_station[0].station_code[0];
                const departure_date = result.data.vagon[i].vagon_info[0].send_date[0];
                const codestcurrent = result.data.vagon[i].position[0].current_position_code[0];
                const oper_date_last = result.data.vagon[i].position[0].current_position_date[0];
                const codeoper = result.data.vagon[i].position[0].operation_asoup_code[0];
                const codecargo = result.data.vagon[i].position[0].etsng_code[0];

                const owner_name = result.data.vagon[i].vagon_info[0].vagon_specifications[0].owner;
                const owner_code = result.data.vagon[i].vagon_info[0].vagon_specifications[0].owner_code;
                const owner_okpo = result.data.vagon[i].vagon_info[0].vagon_specifications[0].owner_okpo;

                const operator_name = result.data.vagon[i].vagon_info[0].vagon_specifications[0].operator;
                const operator_okpo = result.data.vagon[i].vagon_info[0].vagon_specifications[0].operator_okpo;
                const weight = result.data.vagon[i].position[0].weight;

                const gruz_sender_code = result.data.vagon[i].position[0].gruz_sender;
                const gruz_sender_okpo = result.data.vagon[i].position[0].gruz_sender_okpo;
                const gruz_sender_name = result.data.vagon[i].position[0].gruz_sender_name;

                const gruz_receiver_code = result.data.vagon[i].position[0].gruz_receiver;
                const gruz_receiver_okpo = result.data.vagon[i].position[0].gruz_receiver_okpo;
                const gruz_receiver_name = result.data.vagon[i].position[0].gruz_receiver_name;


                const checkLastOper = await pool.query("select checklastoper($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)",
                    [
                        carnum.toString(),
                        codestfrom.toString(),
                        codestdest.toString(),
                        departure_date.toString(),
                        codestcurrent.toString(),
                        oper_date_last.toString(),
                        codeoper.toString(),
                        codecargo.toString(),
                        owner_name.toString(),
                        owner_code.toString(),
                        owner_okpo.toString(),
                        operator_name.toString(),
                        operator_okpo.toString(),
                        weight.toString(),
                        gruz_sender_code.toString(),
                        gruz_sender_okpo.toString(),
                        gruz_sender_name.toString(),
                        gruz_receiver_code.toString(),
                        gruz_receiver_okpo.toString(),
                        gruz_receiver_name.toString()
                    ]);

                // const checkLastOperation = await pool.query("select * from Dislocation where Carnumber = $1 and codestfrom = $2 and codestdest = $3 and oper_date_last = $4", [carnum,codestfrom,codestdest,oper_date_last]);
                //
                // if(checkLastOperation.rowCount === 0){
                //     const LastOperDate = await pool.query("select to_char(d.oper_date_last, 'DD.MM.YYYY, HH:mm:ss') from Dislocation d where d.Carnumber = $1", [carnum]);
                //
                //     if(LastOperDate.rowCount > 0){
                //         if(oper_date_last > LastOperDate.rows[0].to_char){
                //             const deleteCurrentWagon = await pool.query("delete from Dislocation where Carnumber = $1", [carnum]);
                //
                //             const addToCarOperationHistory = await pool.query("insert into CarOperationHistory (carnumber,codestfrom,codestdest,departure_date,codestcurrent,oper_date_last,codeoper,codecargo,date_ins) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)", [carnum.toString(), codestfrom.toString(), codestdest.toString(), departure_date.toString(), codestcurrent.toString(), oper_date_last.toString(), codeoper.toString(), codecargo.toString(), datetime]);
                //
                //             const addToDislocation = await pool.query("insert into dislocation (carnumber,codestfrom,codestdest,departure_date,codestcurrent,oper_date_last,codeoper,codecargo,date_ins) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)", [carnum.toString(), codestfrom.toString(), codestdest.toString(), departure_date.toString(), codestcurrent.toString(), oper_date_last.toString(), codeoper.toString(), codecargo.toString(), datetime]);
                //             continue;
                //         }
                //         continue;
                //     }
                //     const addToCarOperationHistoryFirst = await pool.query("insert into CarOperationHistory (carnumber,codestfrom,codestdest,departure_date,codestcurrent,oper_date_last,codeoper,codecargo,date_ins) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)", [carnum.toString(), codestfrom.toString(), codestdest.toString(), departure_date.toString(), codestcurrent.toString(), oper_date_last.toString(), codeoper.toString(), codecargo.toString(), datetime]);
                //     const addToDislocationFirst = await pool.query("insert into dislocation (carnumber,codestfrom,codestdest,departure_date,codestcurrent,oper_date_last,codeoper,codecargo,date_ins) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)", [carnum.toString(), codestfrom.toString(), codestdest.toString(), departure_date.toString(), codestcurrent.toString(), oper_date_last.toString(), codeoper.toString(), codecargo.toString(), datetime]);
                //     continue;
                // }
            }
            await res.json({message: 'Done'});
        });

        const clearNames = await pool.query("update Dislocation\n" +
            "set owner_name = REPLACE(owner_name,'&quot;','\"')\n" +
            ",operator_name = REPLACE(operator_name,'&quot;','\"')\n" +
            ",gruz_sender_name = REPLACE(gruz_sender_name,'&quot;','\"')\n" +
            ",gruz_receiver_name = REPLACE(gruz_receiver_name,'&quot;','\"')\n" +
            "where\n" +
            "\towner_name like '%$quot%' or\n" +
            "\toperator_name like '%$quot%'\n" +
            "\tgruz_sender_name like '%$quot%'\n" +
            "\tgruz_receiver_name like '%$quot%'\n");

    }catch (e) {}
};

module.exports = quoteController;