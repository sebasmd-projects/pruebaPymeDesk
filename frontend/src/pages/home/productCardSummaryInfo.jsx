import { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';

export default function ProductCardSummaryInfo() {
    const apiPath = process.env.NEXT_PUBLIC_BACKEND_URL

    const [bestSellingProduct, setBestSellingProduct] = useState("");

    useEffect(() => {
        axios.get(`${apiPath}/api/summary/`)
            .then(response => {
                setBestSellingProduct(response.data.best_selling_product);
            })
            .catch(error => {
                console.error(error);
            });
    }, [apiPath]);

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Producto más vendido
                </Typography>
                <Typography variant="h5" component="div">
                    {bestSellingProduct}
                </Typography>
            </CardContent>
        </Card>
    );
}
