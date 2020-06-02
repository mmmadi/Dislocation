const fetch = require('node-fetch');
const parseString = require('xml2js').parseString;

const quoteController = {};

quoteController.RemoveFromTracking = async(req, res) => {
    try {
        const {wagon_ids} = req.body;

        const url = `https://www.railwagonlocation.com/xml/export.php?name=petroleumApiNew&password=th2pVP0NLKdkj28dD&request_type=take_off_vagons&client_ids=${wagon_ids}`;
        
        const data = await fetch(url,{
            method: 'GET',
            headers: {'Content-Type': 'application/xml'}
        });

        const response = await data.text();

        parseString(response, async function (err, result){
            await res.json(result.data.vagon[0].status);
        });
        

    } catch (err) {
        console.log(err.messages);
    }
}

module.exports = quoteController;