import type { DocumentProps } from "next/document";
import Document, { Html, Head, Main, NextScript } from 'next/document'

type Props = Record<string, unknown> & DocumentProps;

//<link rel='manifest' href='/site.webmanifest' />
//<link rel='mask-icon' href='/safari-pinned-tab.svg' color='#000000' />
//<meta name='msapplication-TileColor' content='#ff0000' />
//<meta name='theme-color' content='#ffffff' />
//<Script src='/embed-init-iframe.js' strategy='beforeInteractive' />

export const getDirFromLang = (locale: string | undefined) =>
  locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr';

class MyDocument extends Document<Props> {
  render() {
    const { locale } = this.props.__NEXT_DATA__;
    const dir = getDirFromLang(locale);
    return (
      <Html lang={locale} dir={dir}>
        <Head>
          <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
