// tslint:disable:export-name

import Document, { DefaultDocumentIProps, Head, Main, NextDocumentContext, NextScript, DocumentProps } from "next/document";

import LayoutHeader from "../src/theming/Layout/LayoutHeader";
import { ILayoutHeaderProps } from "../src/theming/Layout/ILayoutHeaderProps";
import { negotiateLanguage } from "../src/locales";

type MHDocumentProps = ILayoutHeaderProps & DefaultDocumentIProps & DocumentProps;

export default class MHDocument extends Document<MHDocumentProps> {
  static async getInitialProps(ctx: NextDocumentContext): Promise<MHDocumentProps> {
    const [
      documentProps,
      headerProps,
    ] = await Promise.all([
      Document.getInitialProps(ctx),
      MHDocument.getHeaderProps(ctx),
    ]);

    return {...(documentProps as DefaultDocumentIProps & DocumentProps), ...headerProps};
  }
  static async getHeaderProps(ctx: NextDocumentContext): Promise<ILayoutHeaderProps> {
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
