import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import './App.css';

const App = () => {
    const [month, setMonth] = useState('March');
    const [search, setSearch] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [barChartData, setBarChartData] = useState({});
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    useEffect(() => {
        fetchTransactions();
        fetchStatistics();
        fetchBarChartData();
    }, [month, search, page]);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/transactions`, {
                params: {
                    search,
                    page,
                    perPage: 10
                }
            });
            setTransactions(response.data.transactions);
            setTotalPages(Math.ceil(response.data.total / 10));
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const fetchStatistics = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/statistics/${month}`);
            setStatistics(response.data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    const fetchBarChartData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/charts/bar/${month}`);
            setBarChartData(response.data);
        } catch (error) {
            console.error('Error fetching bar chart data:', error);
        }
    };

    return (
        <div className="App">
            <h1>Transactions Dashboard</h1>
            <div className="controls">
                <label>
                    Select Month:
                    <select value={month} onChange={e => setMonth(e.target.value)}>
                        {months.map((m, index) => (
                            <option key={index} value={m}>{m}</option>
                        ))}
                    </select>
                </label>
                <input
                    type="text"
                    placeholder="Search transactions"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <TransactionsTable transactions={transactions} page={page} totalPages={totalPages} setPage={setPage} />
            <Statistics statistics={statistics} />
            <BarChart barChartData={barChartData} />
        </div>
    );
};

export default App;
