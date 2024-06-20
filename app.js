const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const initializeRoutes = require('./routes/initialize');
const transactionsRoutes = require('./routes/transactions');
const statisticsRoutes = require('./routes/statistics');
const chartsRoutes = require('./routes/charts');
const combinedRoutes = require('./routes/combined');

const app = express();
app.use(bodyParser.json());

app.use('/initialize', initializeRoutes);
app.use('/transactions', transactionsRoutes);
app.use('/statistics', statisticsRoutes);
app.use('/charts', chartsRoutes);
app.use('/combined', combinedRoutes);

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});
