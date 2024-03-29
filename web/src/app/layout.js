import './globals.css'

import Head from 'next/head'

// export const metadata = {
//   title: 'PC Bee Parts',
//   description: 'PC Bee Parts Ordering System',
// }

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <Head>
        <title>PC Bee Parts</title>
        <link rel='icon' href='/logo.jpg' />
        <meta name='description' content='PC Bee Parts Ordering System' />
      </Head>
      <body>{children}</body>
    </html>
  )
}
