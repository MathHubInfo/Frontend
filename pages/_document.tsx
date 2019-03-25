// tslint:disable:export-name

import Document, { DefaultDocumentIProps, Head, Main, NextDocumentContext, NextScript } from "next/document";

import LayoutHeader from "../src/theming/Layout/LayoutHeader";

export default class MHDocument extends Document {
  static async getInitialProps(ctx: NextDocumentContext): Promise<DefaultDocumentIProps> {
    return Document.getInitialProps(ctx);
  }

  render() {
    return (
      <html>
        <Head>
          <LayoutHeader />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
