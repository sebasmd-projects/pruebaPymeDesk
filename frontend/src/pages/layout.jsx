import Head from 'next/head'

import { Container, Grid, Box } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import NavBar from '@/components/ui/navbar/navbar';

import styles from '../styles/layout.module.css'
import Link from 'next/link';

export default function RootLayout({ children }) {
  
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Head>
        <title>PymeDesk</title>
        <meta name="author" content="Sebastian Morales" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header>
        <NavBar />
      </header>
      <main className={`${styles.main} ${inter.className}`}>
        {children}
      </main>
      <footer className="footer-admin mt-auto footer-light">
        <Container maxWidth="xl" sx={{ px: 4 }}>
          <Grid container>
            <Grid item xs={12}>
              <Box textAlign="center" py={2} fontSize="small">
              <Link href="http://sebasmoralesd.com/" target='_blank' style={{fontFamily:'Roboto'}}>© Sebastián Morales {currentYear}</Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </>
  )
}
