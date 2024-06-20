const { models } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

const getBarChart = async (req, res) => {
    const { month } = req.params;
    const startDate = moment().month(month).startOf('month').toDate();
    const endDate = moment().month(month).endOf('month').toDate();

    try {
        const transactions = await models.Transaction.findAll({
            where: {
                dateOfSale: { [Op.between]: [startDate, endDate] }
            }
        });

        const priceRanges = {
            '0-100': 0,
            '101-200': 0,
            '201-300': 0,
            '301-400': 0,
            '401-500': 0,
            '501-600': 0,
            '601-700': 0,
            '701-800': 0,
            '801-900': 0,
            '901-above': 0
        };

        transactions.forEach(transaction => {
            const price = transaction.price;
            if (price <= 100) priceRanges['0-100']++;
            else if (price <= 200) priceRanges['101-200']++;
            else if (price <= 300) priceRanges['201-300']++;
            else if (price <= 400) priceRanges['301-400']++;
            else if (price <= 500) priceRanges['401-500']++;
            else if (price <= 600) priceRanges['501-600']++;
            else if (price <= 700) priceRanges['601-700']++;
            else if (price <= 800) priceRanges['701-800']++;
            else if (price <= 900) priceRanges['801-900']++;
            else priceRanges['901-above']++;
        });

        res.status(200).json(priceRanges);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPieChart = async (req, res) => {
    const { month } = req.params;
    const startDate = moment().month(month).startOf('month').toDate();
    const endDate = moment().month(month).endOf('month').toDate();

    try {
        const transactions = await models.Transaction.findAll({
            where: {
                dateOfSale: { [Op.between]: [startDate, endDate] }
            }
        });

        const categories = {};

        transactions.forEach(transaction => {
            const category = transaction.category;
            if (!categories[category]) categories[category] = 0;
            categories[category]++;
        });

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getBarChart, getPieChart };
