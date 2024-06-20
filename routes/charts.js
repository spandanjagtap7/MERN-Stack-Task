const express = require('express');
const chartsController = require('../controllers/chartsController');

const router = express.Router();

router.get('/bar/:month', chartsController.getBarChart);
router.get('/pie/:month', chartsController.getPieChart);

module.exports = router;
