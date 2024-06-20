const express = require('express');
const combinedController = require('../controllers/combinedController');

const router = express.Router();

router.get('/:month', combinedController.getCombinedData);

module.exports = router;
