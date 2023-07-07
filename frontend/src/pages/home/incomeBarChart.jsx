import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function IncomeBarChart() {
    const apiPath = process.env.NEXT_PUBLIC_BACKEND_URL

    const [incomeLastMonth, setIncomeLastMonth] = useState(0)
    const [incomeCurrentMonth, setIncomeCurrentMonth] = useState(0)

    useEffect(() => {
        axios.get(`${apiPath}/api/summary/`)
            .then(response => {
                setIncomeLastMonth(response.data.income_last_month);
                setIncomeCurrentMonth(response.data.income_current_month);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const data = {
        labels: [
            'Mes Anterior',
            'Mes Actual',
        ],
        datasets: [
            {
                label: 'Ingresos',
                data: [
                    parseFloat(incomeLastMonth).toFixed(2),
                    parseFloat(incomeCurrentMonth).toFixed(2),
                ],
                backgroundColor: [
                    'rgba(67, 240, 163, 1)',
                    'rgba(67, 240, 163, 0.6)',
                ],
                borderColor: 'rgba(47, 97, 68, 1)',
                borderWidth: 2,
            },
        ],
    };

    return (
        <div>
            <h2>Ingresos</h2>
            <Bar data={data} options={options} />
        </div>
    )
};

