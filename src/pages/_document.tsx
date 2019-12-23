import { SITE_TITLE } from "@static/constants";
import customTheme from "@static/theme";
import { jsontocss } from "@utils/style";
import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="theme-color" content="#2f855a" />
          <meta name="Description" content={SITE_TITLE} />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="shortcut icon" href="/android-chrome-192x192.png" />
          <style>{jsontocss(customTheme)}</style>
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