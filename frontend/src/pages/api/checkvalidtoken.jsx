import axios from 'axios';

export default async function handler(req, res) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const { token } = req.body;

    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed | error 405' });
        return;
    }

    try {
        const response = await axios.post(`${backendUrl}/api/token/verify/`, { token });
        const { detail, code } = response.data;
        if (code === 'token_is_valid') {
            res.status(200).json({ message: 'Token is valid' });
        } else {
            res.status(401).json({ message: 'Token is invalid or expired' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor | Error 500' });
    }
}
