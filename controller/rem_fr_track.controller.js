const pool = require('../config/dbPool');
const fetch = require('node-fetch');

const quoteController = {};

quoteController.RemoveFromTracking = async(req, res) => {
    try {
        const {wagon_ids} = req.body;
        url = ``;
        const data = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/xml'}
        });

        const response = await data.text();

        

    } catch (err) {
        console.log(err.messages);
    }
}

module.exports =quoteController;