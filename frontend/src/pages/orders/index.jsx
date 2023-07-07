import Head from 'next/head'
import { Container } from '@mui/material';

import RootLayout from '@/pages/layout';
import OrdersTable from './components/ordersTable';


export default function OrdersPage() {
    return (
        <RootLayout>
            <Head>
                <title>PymeDesk | Pedidos</title>
                <meta name="description" content="Listado de las ordenes del comercio" />
            </Head>
            <Container>
                <OrdersTable />
            </Container>
        </RootLayout>
    )
}