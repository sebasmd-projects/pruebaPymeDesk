import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FormGroup, TextField, Button, Container } from '@mui/material';
import RootLayout from '@/pages/layout';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const checkTokenValidity = async () => {
            const accessToken = localStorage.getItem('accessToken');

            try {
                const response = await axios.post('/api/checkvalidtoken', { token: accessToken });
                const { message } = response.data;

                if (message === 'Token is valid') {
                    router.push('/');
                }
            } catch (error) {
                console.error('Error checking token validity:', error);
            }
        };

        if (router.pathname === '/accounts/login') {
            checkTokenValidity();
        }
    }, [router.pathname]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            localStorage.removeItem('user_id');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('first_name');
            localStorage.removeItem('last_name');
            const response = await axios.post('/api/login', { username: username.toLowerCase(), password });
            const { user_id, refresh, access, first_name, last_name } = response.data;
            localStorage.setItem('user_id', user_id);
            localStorage.setItem('refreshToken', refresh);
            localStorage.setItem('accessToken', access);
            localStorage.setItem('first_name', first_name);
            localStorage.setItem('last_name', last_name);
            router.push('/');
        } catch (error) {
            console.error('Error during login:', error);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Error al iniciar sesión');
            }
        }
    };

    return (
        <RootLayout>
            <Container>
                <h2>Iniciar Sesión</h2>
                {error && <p>{error}</p>}
                <form onSubmit={handleLogin}>
                    <FormGroup sx={{ m: 1 }}>
                        <TextField
                            label="Usuario o Correo"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup sx={{ m: 1 }}>
                        <TextField
                            type="password"
                            label="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>
                    <Button variant="contained" fullWidth type="submit">
                        Iniciar sesión
                    </Button>
                </form>
            </Container>
        </RootLayout>
    );
}
