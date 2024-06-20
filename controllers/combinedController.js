const axios = require('axios');

const getCombinedData = async (req, res) => {
    const { month } = req.params;

    try {
        const [statisticsResponse, barChartResponse, pieChartResponse] = await Promise.all([
            axios.get(`http://localhost:3000/statistics/${month}`),
            axios.get(`http://localhost:3000/charts/bar/${month}`),
            axios.get(`http://localhost:3000/charts/pie/${month}`)
        ]);

        const combinedData = {
            statistics: statisticsResponse.data,
            barChart: barChartResponse.data,
            pieChart: pieChartResponse.data
        };

        res.status(200).json(combinedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getCombinedData };
