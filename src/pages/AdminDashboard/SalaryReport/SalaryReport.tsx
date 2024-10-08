import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './SalaryReport.css'; // Create a CSS file for styling

const SalaryReport = () => {
    const [users, setUsers] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/users/get-all-users?month=${selectedMonth}`);
                setUsers(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [selectedMonth]);

    // Function to group attendance records by date and calculate total overtime for the selected month
    const groupByDate = (attendanceRecords) => {
        const grouped = {};
        attendanceRecords
            .filter(record => new Date(record.date).getMonth() === months.indexOf(selectedMonth)) // Filter records for the selected month
            .forEach((record) => {
                const date = new Date(record.date).toLocaleDateString();
                if (grouped[date]) {
                    grouped[date].overtime += parseInt(record.overtime) || 0;
                } else {
                    grouped[date] = {
                        date,
                        overtime: parseInt(record.overtime) || 0,
                    };
                }
            });
        return Object.values(grouped);
    };

    // Constants
    const hourlyRate = 100; // Taka per hour

    // Months for the dropdown
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];

    return (
        <div className="salary-report-container">
            <h2>Salary Reports</h2>

            {/* Dropdown for selecting the month */}
            <label>Select Month: </label>
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                <option value="">Select a month</option>
                {months.map((month) => (
                    <option key={month} value={month}>
                        {month}
                    </option>
                ))}
            </select>

            {users.map((user) => (
                <div key={user._id} className="user-container">
                    <h3>{user.name}'s Salary Report</h3>
                    <p>Salary: {user.salary || 0} Tk</p>

                    {user.attendanceRecords && user.attendanceRecords.length > 0 && (
                        <div>
                            <h4>Overtime Details</h4>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Total Overtime</th>
                                        <th>Overtime Money</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {groupByDate(user.attendanceRecords).map((group) => (
                                        <tr key={group.date}>
                                            <td>{group.date}</td>
                                            <td>{group.overtime} hours</td>
                                            <td>{group.overtime * hourlyRate} Tk</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <p>Total Salary: {user.salary + (groupByDate(user.attendanceRecords).reduce((total, group) => total + group.overtime || 0, 0) * hourlyRate)} Tk</p>

                    <hr />
                </div>
            ))}
        </div>
    );
};

export default SalaryReport;
