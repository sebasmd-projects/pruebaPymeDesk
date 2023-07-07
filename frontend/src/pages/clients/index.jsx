import Head from 'next/head'

import { Container } from '@mui/material';

import RootLayout from '@/pages/layout';
import ClientsTable from './components/clientsTable';

export default function Home() {
    

    return (

        <RootLayout>
            <Head>
                <title>PymeDesk | Clientes</title>
                <meta name="description" content="Listado de los clientes del comercio" />
            </Head>
            <Container>
                <ClientsTable />
            </Container>
        </RootLayout>
    )
}