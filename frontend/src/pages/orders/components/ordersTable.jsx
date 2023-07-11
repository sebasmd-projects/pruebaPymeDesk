import { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Button, Select, MenuItem } from '@mui/material';
import Link from 'next/link';
import axios from 'axios';

const OrdersTable = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const apiPath = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${apiPath}/api/orders/`);
                setOrders(response.data.results);
                setFilteredOrders(response.data.results);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
    
        fetchOrders();
    }, [apiPath]);
    

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);

        const filtered = orders.filter((order) =>
            order.id.toString().includes(event.target.value) ||
            order.date_order.toString().includes(event.target.value) ||
            order.state.toString().includes(event.target.value) ||
            order.shipping_rule.toString().includes(event.target.value)

        );
        setFilteredOrders(filtered);
    };

    const handleEditState = (order) => {
        setSelectedOrder(order);
    };

    const handleSaveChanges = async () => {
        try {
            const response = await axios.patch(
                `${apiPath}/api/orders/${selectedOrder.id}/`,
                {
                    state: selectedOrder.state,
                    paid: selectedOrder.paid,
                    shipping_rule: selectedOrder.shipping_rule,
                    observations: selectedOrder.observations
                }
            );
            const updatedOrder = response.data;
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === updatedOrder.id ? updatedOrder : order
                )
            );
            setFilteredOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === updatedOrder.id ? updatedOrder : order
                )
            );
        } catch (error) {
            console.error('Error saving changes:', error);
        } finally {
            setSelectedOrder(null);
        }
    };


    const handleStateChange = (event) => {
        setSelectedOrder((prevOrder) => ({
            ...prevOrder,
            state: event.target.value
        }));
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Orders
            </Typography>
            <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
                style={{ marginBottom: 16 }}
            />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Pago</TableCell>
                            <TableCell>Regla de envío</TableCell>
                            <TableCell>Observaciones</TableCell>
                            <TableCell>Productos</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOrders.map((order) => (
                            <TableRow key={`${order.id}-state`}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.date_order}</TableCell>
                                <TableCell>
                                    {selectedOrder && selectedOrder.id === order.id ? (
                                        <Select
                                            value={selectedOrder.state}
                                            onChange={handleStateChange}
                                            autoFocus
                                            fullWidth
                                        >
                                            <MenuItem value="pending">Pendiente</MenuItem>
                                            <MenuItem value="in_route">En Ruta</MenuItem>
                                            <MenuItem value="delivered">Entregado</MenuItem>
                                            <MenuItem value="cancelled">Cancelado</MenuItem>
                                        </Select>
                                    ) : (
                                        order.state
                                    )}
                                </TableCell>
                                <TableCell>{order.paid ? 'true' : 'false'}</TableCell>
                                <TableCell>{order.shipping_rule}</TableCell>
                                <TableCell>{order.observations}</TableCell>
                                <TableCell>
                                    <ul>
                                        {order.products.map((product) => (
                                            <li key={`${order.id}-product`}>{product.product.name} </li>
                                        ))}
                                    </ul>

                                </TableCell>
                                <TableCell>
                                    <Link href={`/orders/${order.id}`} passHref style={{ color: 'blue', textDecoration: 'underline' }}>
                                        Ver más
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {selectedOrder && selectedOrder.id === order.id ? (
                                        <Button onClick={handleSaveChanges} variant="contained" color="primary">
                                            Guardar Cambios
                                        </Button>
                                    ) : (
                                        <Button onClick={() => handleEditState(order)} variant="outlined" color="primary">
                                            Editar Estado
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default OrdersTable;
