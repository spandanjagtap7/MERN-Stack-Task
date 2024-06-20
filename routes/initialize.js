const express = require('express');
const initializeController = require('../controllers/initializeController');

const router = express.Router();

router.get('/', initializeController.initializeDatabase);

module.exports = router;
