const sequelize = require('../config/database');
const Transaction = require('./transaction');

const models = {
    Transaction: Transaction(sequelize)
};

module.exports = { sequelize, models };
