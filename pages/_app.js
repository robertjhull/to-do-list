import { CookiesProvider } from 'react-cookie'
import '../css/style.css'
import '../css/form.css'
import '../css/table.css'
import Head from 'next/head'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Notes</title>
      </Head>
      <div className="grid wrapper">
        <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
      </div>
    </>
  )
}

export default MyApp
