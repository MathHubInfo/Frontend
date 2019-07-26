// tslint:disable:export-name

import Document, { Head, Main, DocumentContext, NextScript, DocumentProps } from "next/document";

import LayoutHeader from "../src/theming/Layout/LayoutHeader";
import { ILayoutHeaderProps } from "../src/theming/Layout/ILayoutHeaderProps";
import { negotiateLanguage } from "../src/locales";

type MHDocumentProps = ILayoutHeaderProps & DocumentProps;

export default class MHDocument extends Document<MHDocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<MHDocumentProps> {
    const [
      documentProps,
      headerProps,
    ] = await Promise.all([
      Document.getInitialProps(ctx),
      MHDocument.getHeaderProps(ctx),
    ]);

    return {...(documentProps as DocumentContext & DocumentProps), ...headerProps};
  }
  static async getHeaderProps(ctx: DocumentContext): Promise<ILayoutHeaderProps> {
    const language = negotiateLanguage(ctx, true);

    return { language };
  }

  render() {
    return (
      <html lang={this.props.language}>
        <Head>
          <LayoutHeader language={this.props.language} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
