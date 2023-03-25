import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import { seoConfig } from '@/lib/config/next-seo.config';
import { appWithTranslation } from 'next-i18next';

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

const interFont = Inter({ subsets: ['latin'], variable: '--font-inter', preload: true, display: 'swap' })

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...seoConfig.defaultNextSeo} />
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
	<style dangerouslySetInnerHTML={{__html: ` :root { --font-inter: ${interFont.style.fontFamily}; }`}}/>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(App)
