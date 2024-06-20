const { models } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

const getStatistics = async (req, res) => {
    const { month } = req.params;
    const startDate = moment().month(month).startOf('month').toDate();
    const endDate = moment().month(month).endOf('month').toDate();

    try {
        const totalSaleAmount = await models.Transaction.sum('price', {
            where: {
                dateOfSale: { [Op.between]: [startDate, endDate] },
                sold: true
            }
        });

        const totalSoldItems = await models.Transaction.count({
            where: {
                dateOfSale: { [Op.between]: [startDate, endDate] },
                sold: true
            }
        });

        const totalNotSoldItems = await models.Transaction.count({
            where: {
                dateOfSale: { [Op.between]: [startDate, endDate] },
                sold: false
            }
        });

        res.status(200).json({
            totalSaleAmount,
            totalSoldItems,
            totalNotSoldItems
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getStatistics };
