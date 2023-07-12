import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { TextField, Typography, Button, FormGroup, Container, FormControl, FormLabel, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';

export default function CreateOrder() {
    const router = useRouter();
    const apiPath = process.env.NEXT_PUBLIC_BACKEND_URL;

    const [clientsList, setClients] = useState([]);
    const [productsList, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        state: '',
        paid: false,
        shipping_rule: '',
        observations: '',
        client: '',
        details: [{ product: '', amount: 1 }],
    });

    const fetchClients = async () => {
        try {
            const response = await axios.get(`${apiPath}/api/users/`);
            setClients(response.data.results);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${apiPath}/api/products/`);
            setProducts(response.data.results);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchClients();
        fetchProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${apiPath}/api/orders/create/`, { ...formData });
            router.push('/orders');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleStateChange = (e) => {
        setFormData({ ...formData, state: e.target.value });
    };

    const handlePaidChange = (e) => {
        setFormData({ ...formData, paid: e.target.checked });
    };

    const handleShippingRuleChange = (e) => {
        setFormData({ ...formData, shipping_rule: e.target.value });
    };

    const handleObservationsChange = (e) => {
        setFormData({ ...formData, observations: e.target.value });
    };

    const handleClientChange = (e) => {
        setFormData({ ...formData, client: e.target.value });
    };

    const handleProductChange = (index, productId) => {
        const newDetails = [...formData.details];
        newDetails[index] = { ...newDetails[index], product: productId };
        setFormData({ ...formData, details: newDetails });
    };

    const handleAmountChange = (index, amount) => {
        if (amount >= 1) {
            const newDetails = [...formData.details];
            newDetails[index] = { ...newDetails[index], amount };
            setFormData({ ...formData, details: newDetails });
        }
    };

    const handleAddProduct = () => {
        const newDetails = [...formData.details, { product: '', amount: 1 }];
        setFormData({ ...formData, details: newDetails });
    };

    const handleRemoveProduct = (index) => {
        const newDetails = [...formData.details];
        newDetails.splice(index, 1);
        setFormData({ ...formData, details: newDetails });
    };

    return (
        <Container>
            <h2>Crear orden nueva</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <FormControl>
                        <FormLabel htmlFor="state">Estado:</FormLabel>
                        <Select
                            id="state"
                            value={formData.state}
                            onChange={handleStateChange}
                        >
                            <MenuItem value="pending">Pendiente</MenuItem>
                            <MenuItem value="in_route">En Ruta</MenuItem>
                            <MenuItem value="delivered">Entregado</MenuItem>
                            <MenuItem value="cancelled">Cancelado</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="shipping_rule">Regla de envío:</FormLabel>
                        <Select
                            id="shipping_rule"
                            value={formData.shipping_rule}
                            onChange={handleShippingRuleChange}
                        >
                            <MenuItem value="home_delivery">Domicilio</MenuItem>
                            <MenuItem value="home_pick_up">Recoger</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <TextField
                            id="observations"
                            label="Observaciones"
                            value={formData.observations}
                            onChange={handleObservationsChange}
                            multiline
                            rows={3}
                            sx={{ mt: 2 }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="client">Cliente:</FormLabel>
                        {clientsList && (
                            <Select
                                id="client"
                                value={formData.client}
                                onChange={handleClientChange}
                            >
                                {clientsList.map((client) => (
                                    <MenuItem key={client.id} value={client.id}>{client.id} - {client.first_name} {client.last_name}</MenuItem>
                                ))}
                            </Select>
                        )}
                    </FormControl>

                    <FormControlLabel
                        label="Estado del pago"
                        control={
                            <Checkbox
                                id="paid"
                                checked={formData.paid}
                                onChange={handlePaidChange}
                            />
                        }
                    />

                    <div>
                        <Typography variant="h5" sx={{ mt: 2 }}>Detalles de la orden:</Typography>
                        {formData.details.map((detail, index) => (
                            <div key={index}>
                                <FormControl>
                                    <Select
                                        id={`product-${index}`}
                                        value={detail.product}
                                        onChange={(e) => handleProductChange(index, e.target.value)}
                                        sx={{ mt: 2 }}
                                    >
                                        {productsList.map((product) => (
                                            <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl>
                                    <TextField
                                        id={`amount-${index}`}
                                        type="number"
                                        value={detail.amount}
                                        onChange={(e) => handleAmountChange(index, e.target.value)}
                                        sx={{ mt: 2 }}
                                    />
                                </FormControl>

                                {(index === 1 || formData.details.length > 1) && (
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleRemoveProduct(index)}
                                        sx={{ mt: 3, mx: 1 }}
                                    >
                                        Eliminar Producto
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button variant="outlined" color="primary" onClick={handleAddProduct} sx={{ mt: 2 }}>
                            Agregar Nuevo Producto
                        </Button>
                    </div>
                    <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                        Crear Orden
                    </Button>
                </FormGroup>
            </form>
        </Container>
    );
};
