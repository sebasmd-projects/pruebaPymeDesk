import { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';

export default function CityCardSummaryInfo() {
  const apiPath = process.env.NEXT_PUBLIC_BACKEND_URL

  const [cityMoreOrders, setCityMoreOrders] = useState("");

  useEffect(() => {
    axios.get(`${apiPath}/api/summary/`)
      .then(response => {
        setCityMoreOrders(response.data.city_more_orders);
      })
      .catch(error => {
        console.error(error);
      });
  }, [apiPath]);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Ciudad con más pedidos
        </Typography>
        <Typography variant="h5" component="div">
          {cityMoreOrders}
        </Typography>
      </CardContent>
    </Card>
  );
}
