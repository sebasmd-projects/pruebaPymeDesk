import axios from 'axios';

export default async function handler(req, res) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  const { username, password } = req.body

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed | error 405' });
    return;
  }

  try {
    const response = await axios.post(`${backendUrl}/api/token/`, { username, password });
    const { user_id, refresh, access, first_name, last_name } = response.data;
    res.status(200).json({ user_id, refresh, access, first_name, last_name });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      res.status(401).json({ message: 'Credenciales inválidas | Error 401' });
    } else {
      res.status(500).json({ message: 'Error del servidor | Error 500' });
    }
  }
}
