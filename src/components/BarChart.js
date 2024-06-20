import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ barChartData }) => {
    const data = {
        labels: Object.keys(barChartData),
        datasets: [{
            label: '# of Items',
            data: Object.values(barChartData),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderWidth: 1
        }]
    };

    return (
        <div>
            <Bar data={data} />
        </div>
    );
};

export default BarChart;
