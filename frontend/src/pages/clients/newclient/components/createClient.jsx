import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { TextField, Button, FormGroup, Container } from '@mui/material';

const CreateClient = () => {
    const router = useRouter();

    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        phone: '',
        city: '',
        address: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const apiPath = process.env.NEXT_PUBLIC_BACKEND_URL;
            const response = await axios.post(`${apiPath}/api/users/create/`, { ...formData });
            router.push('/clients');
        } catch (error) {
            setError(error);
        }
    };

    return (
        <Container>
            <h2>Crear Usuario</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <TextField
                        label="Nombre(s)"
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        sx={{ m: 1 }}
                    />
                    <TextField
                        label="Apellido(s)"
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        sx={{ m: 1 }}
                    />
                    <TextField
                        label="Correo"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        sx={{ m: 1 }}
                    />
                    <TextField
                        label="Celular"
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        sx={{ m: 1 }}
                    />
                    <TextField
                        label="Ciudad"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        sx={{ m: 1 }}
                    />
                    <TextField
                        label="Dirección"
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        sx={{ m: 1 }}
                    />
                    <TextField
                        label="Usuario"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        sx={{ m: 1 }}
                    />
                    <Button variant="contained" color="primary" type="submit" sx={{ m: 1 }}>
                        Crear Cliente
                    </Button>
                </FormGroup>
            </form>
        </Container>
    );
};

export default CreateClient;
