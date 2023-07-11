import { useEffect, useState } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button, TextField } from '@mui/material';
import axios from 'axios';

import RootLayout from '@/pages/layout';

export default function GetClientPage() {
  const apiPath = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [client, setclient] = useState(null);
  const [editingClient, setEditingClient] = useState(null);
  const [editedClient, setEditedClient] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    city: '',
    address: ''
  });

  useEffect(() => {
    const fetchClientId = async () => {
      try {
        const id = localStorage.getItem('user_id');
        const response = await axios.get(`${apiPath}/api/users/${id}/`);
        setclient(response.data);
        setEditedClient(response.data);
      } catch (error) {
        console.error('Error fetching client:', error);
      }
    };

    fetchClientId();
  }, [apiPath]);


  const handleEditClient = () => {
    setEditingClient(client);
    setEditedClient(client);
  };

  const handleClientFieldChange = (event) => {
    setEditedClient((prevClient) => ({
      ...prevClient,
      [event.target.name]: event.target.value
    }));
  };

  const handleSaveClientChanges = async () => {
    try {
      const response = await axios.put(
        `${apiPath}/api/users/${client.id}/`,
        editedClient
      );
      setclient(response.data);
      setEditingClient(null);
    } catch (error) {
      console.error('Error saving client changes:', error);
    }
  };


  return (
    <RootLayout>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre(s)</TableCell>
              <TableCell>Apellido(s)</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Celular</TableCell>
              <TableCell>Ciudad</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Usuario Activo</TableCell>
              <TableCell>Creado</TableCell>
              <TableCell>Actualizado</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {client && editingClient ? (
              <TableRow>
                <TableCell>{client.id}</TableCell>
                <TableCell>
                  <TextField
                    name="first_name"
                    value={editedClient.first_name}
                    onChange={handleClientFieldChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="last_name"
                    value={editedClient.last_name}
                    onChange={handleClientFieldChange}
                  />
                </TableCell>
                <TableCell>{client.username}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>
                  <TextField
                    name="phone"
                    value={editedClient.phone}
                    onChange={handleClientFieldChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="city"
                    value={editedClient.city}
                    onChange={handleClientFieldChange}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="address"
                    value={editedClient.address}
                    onChange={handleClientFieldChange}
                  />
                </TableCell>
                <TableCell>{client.is_active ? 'true' : 'false'}</TableCell>
                <TableCell>{client.created}</TableCell>
                <TableCell>{client.updated}</TableCell>
                <TableCell>
                  <Button onClick={handleSaveClientChanges} variant="contained" color="primary">
                    Guardar
                  </Button>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell>{client ? client.id : ''}</TableCell>
                <TableCell>{client ? client.first_name : ''}</TableCell>
                <TableCell>{client ? client.last_name : ''}</TableCell>
                <TableCell>{client ? client.username : ''}</TableCell>
                <TableCell>{client ? client.email : ''}</TableCell>
                <TableCell>{client ? client.phone : ''}</TableCell>
                <TableCell>{client ? client.city : ''}</TableCell>
                <TableCell>{client ? client.address : ''}</TableCell>
                <TableCell>{client ? (client.is_active ? 'true' : 'false') : ''}</TableCell>
                <TableCell>{client ? client.created : ''}</TableCell>
                <TableCell>{client ? client.updated : ''}</TableCell>
                <TableCell>
                  {client && (
                    <Button onClick={handleEditClient} variant="outlined" color="primary">
                      Editar
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </RootLayout>
  );

}
