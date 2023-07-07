import Head from 'next/head'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


import NavBar from '@/components/ui/navbar/navbar';

import styles from '../styles/layout.module.css'

export default function RootLayout({ children }) {

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
    </>
  )
}
