import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useState,useEffect } from 'react';


function MyApp({ Component, pageProps }: AppProps) {
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    setShowing(true);
  }, []);

  if (!showing) {
    return null;
  }
  if (typeof window === 'undefined') {
    return <></>;
  } else {
    return (
        <Component {...pageProps} />
    );
  }
}

export default MyApp

{/* <Head>
<title>Blog App</title>
 <meta name="description" content="playing with next-js and typescript and tailwind css  creating the blog app" />
  <link rel="shortcut icon" href="/images/head-logo.png" />
<meta name="viewport" content="initial-scale=1.0, width=device-width" />
</Head> */}