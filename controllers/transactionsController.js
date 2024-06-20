const { Op } = require('sequelize');
const { models } = require('../models');

const listTransactions = async (req, res) => {
    const { search, page = 1, perPage = 10 } = req.query;
    const offset = (page - 1) * perPage;
    const limit = parseInt(perPage);

    const whereClause = search ? {
        [Op.or]: [
            { title: { [Op.like]: `%${search}%` } },
            { description: { [Op.like]: `%${search}%` } },
            { price: { [Op.like]: `%${search}%` } }
        ]
    } : {};

    try {
        const transactions = await models.Transaction.findAndCountAll({
            where: whereClause,
            offset,
            limit
        });

        res.status(200).json({
            total: transactions.count,
            transactions: transactions.rows
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { listTransactions };
