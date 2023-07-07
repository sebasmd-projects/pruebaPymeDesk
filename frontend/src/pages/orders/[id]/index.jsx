import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import axios from 'axios';

import RootLayout from '@/pages/layout';

export default function GetOrderPage() {
    const router = useRouter();
    const { id } = router.query;
    const apiPath = process.env.NEXT_PUBLIC_BACKEND_URL;
    const [order, setOrder] = useState(null);

    useEffect(() => {
        if (id) {
            fetchOrderId();
        }
    }, [apiPath, id]);

    const fetchOrderId = async () => {
        try {
            const response = await axios.get(`${apiPath}/api/orders/${id}/`);
            setOrder(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    return (
        <RootLayout>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Pago</TableCell>
                            <TableCell>Regla de envío</TableCell>
                            <TableCell>Observaciones</TableCell>
                            <TableCell>Productos: Cantidad</TableCell>
                            <TableCell>Creado</TableCell>
                            <TableCell>Actualizado</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order && (
                            <TableRow>
                                <TableCell>{order.client}</TableCell>
                                <TableCell>{order.state}</TableCell>
                                <TableCell>{order.paid ? 'Pagado' : 'Pendiente'}</TableCell>
                                <TableCell>{order.shipping_rule}</TableCell>
                                <TableCell>{order.observations}</TableCell>
                                <TableCell>
                                    <ul>
                                        {order.products.map((product) => (
                                            <li key={product.id}>
                                                {product.product.name}: {product.amount}
                                            </li>
                                        ))}
                                    </ul>
                                </TableCell>
                                <TableCell>{order.created}</TableCell>
                                <TableCell>{order.updated}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </RootLayout>
    );
}