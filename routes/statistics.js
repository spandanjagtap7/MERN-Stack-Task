const express = require('express');
const statisticsController = require('../controllers/statisticsController');

const router = express.Router();

router.get('/:month', statisticsController.getStatistics);

module.exports = router;
