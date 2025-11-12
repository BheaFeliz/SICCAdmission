import Head from 'next/head'

// export const metadata = {
//   title: 'PC Bee Parts',
//   description: 'PC Bee Parts Ordering System',
// }

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <Head>
        <title>SICC Admission Test Reservation</title>
        <link rel='icon' href='/logo.jpg' />
        <meta name='description' content='SICC Admission Test Reservation' />
      </Head>
      <body>{children}</body>
    </html>
  )
}
