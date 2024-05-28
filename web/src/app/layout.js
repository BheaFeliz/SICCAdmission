import Head from 'next/head'

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <title>SICC Admission Test Reservation</title>
        <link rel='icon' href='/logo.jpg' />
        <meta name='description' content='SICC Admission Test Reservation' />
      </Head>
      {children}
    </>
  )
}
