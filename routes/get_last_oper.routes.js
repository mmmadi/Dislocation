const {Router} = require('express');
const router = Router();
const quoteController = require('../controller/get_last_oper_controller');

router.get('/', quoteController.GetData);

module.exports = router;