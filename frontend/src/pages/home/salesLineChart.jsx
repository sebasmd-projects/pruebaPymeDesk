import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function SalesLineChart() {
    const apiPath = process.env.NEXT_PUBLIC_BACKEND_URL

    const [salesLastMonth, setSalesLastMonth] = useState(0)
    const [salesCurrentMonth, setSalesCurrentMonth] = useState(0)

    useEffect(() => {
        axios.get(`${apiPath}/api/summary/`)
            .then(response => {
                setSalesLastMonth(response.data.total_sales_last_month);
                setSalesCurrentMonth(response.data.total_sales_current_month);
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

    const salesData = {
        labels: [
            'Mes Anterior',
            'Mes Actual',
        ],
        datasets: [
            {
                label: 'Ventas Totales',
                data: [
                    parseFloat(salesLastMonth).toFixed(2),
                    parseFloat(salesCurrentMonth).toFixed(2),
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
            <h2>Ventas Totales</h2>
            <Line data={salesData} options={options} />
        </div>
    )
};