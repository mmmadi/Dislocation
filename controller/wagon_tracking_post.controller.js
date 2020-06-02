const pool = require('../config/dbPool');
const fetch = require('node-fetch');
const parseString = require('xml2js').parseString;

const quoteController = {};

quoteController.WagonTrackingPost = async(req,res) =>{
    try {
        const {wagon_num} = req.body;

        const url = `https://www.railwagonlocation.com/xml/export.php?name=petroleumApiNew&password=th2pVP0NLKdkj28dD&request_type=add_vagon&vagon_no=${wagon_num}&platform_no=&from=160002&to=000000&send_day=2020-05-15&round_vagon=y&group_id=`;

        const data = await fetch(url,{
            method: 'GET',
            headers: {'Content-Type': 'application/xml'}
        });
        
           const response = await data.text();

           parseString(response, async function (err, result) {
               await res.json(result.data.result[0].errors[0].error[0]);
           });
        

    } catch (err) {
        console.log(err.message);
    }
};

module.exports = quoteController;