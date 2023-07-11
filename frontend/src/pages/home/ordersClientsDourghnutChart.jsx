import { Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from 'axios';



export default function OrdersClientsDoughnutChart() {
    const apiPath = process.env.NEXT_PUBLIC_BACKEND_URL
    const [orders, setOrders] = useState(0)
    const [clients, setClients] = useState(0)

    useEffect(() => {
        axios.get(`${apiPath}/api/summary/`)
            .then(response => {
                setOrders(response.data.num_orders);
                setClients(response.data.num_customers);
            })
            .catch(error => {
                console.error(error);
            });
    }, [apiPath]);

    const doughnutData = {
        labels: [
            'Número de Pedidos',
            'Número de Clientes',
        ],
        datasets: [
            {
                label: 'Datos',
                data: [
                    parseInt(orders),
                    parseInt(clients),
                ],
                backgroundColor: [
                    'rgba(67, 240, 163, 1)',
                    'rgba(39, 207, 245, 0.87)',
                ],
                borderColor: 'rgba(47, 97, 68, 1)',
                borderWidth: 2,
            },
        ],
    };

    return (
        <div style={{ maxHeight: '400px', }}>
            <h2>Número de Pedidos y Clientes</h2>
            <Doughnut data={doughnutData} />
        </div>
    )
}

