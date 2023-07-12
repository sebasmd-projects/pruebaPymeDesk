import Head from 'next/head'

import { Container } from '@mui/material'

import RootLayout from '@/pages/layout';
import CreateOrder from './components/createOrder'

export default function NewOrderPage() {

    return (
        <RootLayout>
            <Head>
                <title>PymeDeks | Nueva Orden</title>
                <meta name="description" content="Crear una nueva orden para el comercio" />
            </Head>
            <Container>
                <CreateOrder />
            </Container>
        </RootLayout>
    )
}