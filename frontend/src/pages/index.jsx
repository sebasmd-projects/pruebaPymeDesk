import Head from 'next/head'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Container, Grid, Box } from '@mui/material';

import RootLayout from '@/pages/layout';

import ProductCardSummaryInfo from './home/productCardSummaryInfo';
import CityCardSummaryInfo from './home/cityCardSummaryInfo';
import OrdersClientsDoughnutChart from './home/ordersClientsDourghnutChart';
import SalesLineChart from './home/salesLineChart';
import IncomeBarChart from './home/incomeBarChart';

import { Chart as ChartJS, ArcElement, Colors, BarController, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js"

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarController, BarElement, Colors, Filler, Title, Tooltip, Legend)

export default function Home() {

  return (

    <RootLayout>
      <Head>
        <title>PymeDesk | Resumen</title>
        <meta name="author" content="Sebastian Morales" />
        <meta name="description" content="Métricas de resúmen del desempeño del comercio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <IncomeBarChart />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SalesLineChart />
          </Grid>
          <Grid item xs={12} sm={6} sx={{mb:2}}>
            <OrdersClientsDoughnutChart />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" height="100%" justifyContent="center" sx={{mb:4}}>
              <div>
                <CityCardSummaryInfo />
                <br />
                <ProductCardSummaryInfo />
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </RootLayout>
  )
}
