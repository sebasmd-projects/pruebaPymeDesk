import Head from 'next/head'

import { Container } from '@mui/material';

import RootLayout from '@/pages/layout';
import CreateClient from './components/createClient';


export default function NewClientPage() {
    

    return (

        <RootLayout>
            <Head>
                <title>PymeDesk | Nuevo Cliente</title>
                <meta name="description" content="Crear un cliente para el comercio" />
            </Head>
            <Container>
                <CreateClient/>
            </Container>
        </RootLayout>
    )
}