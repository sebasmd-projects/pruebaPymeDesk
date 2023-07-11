import { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import axios from 'axios';

const ClientsTable = () => {
    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const apiPath = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get(`${apiPath}/api/users/`);
                setClients(response.data.results);
                setFilteredClients(response.data.results);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        fetchClients();
    }, [apiPath]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);

        const filtered = clients.filter((client) =>
            client.id.toString().includes(event.target.value) ||
            client.username.toLowerCase().includes(event.target.value.toLowerCase()) ||
            client.first_name.toLowerCase().includes(event.target.value.toLowerCase()) ||
            client.last_name.toLowerCase().includes(event.target.value.toLowerCase()) ||
            client.email.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilteredClients(filtered);
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Clients
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
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Address</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredClients.map((client) => (
                            <TableRow key={client.id}>
                                <TableCell>{client.id}</TableCell>
                                <TableCell>{client.first_name}</TableCell>
                                <TableCell>{client.last_name}</TableCell>
                                <TableCell>{client.username}</TableCell>
                                <TableCell>{client.email}</TableCell>
                                <TableCell>{client.phone}</TableCell>
                                <TableCell>{client.city}</TableCell>
                                <TableCell>{client.address}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ClientsTable;
