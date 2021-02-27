// tslint:disable:export-name

import Document, { DocumentContext, DocumentProps, Html, Head, Main, NextScript } from "next/document";
import dynamic from "next/dynamic";
import { negotiateLanguage } from "../src/locales";
import { ILayoutHeaderProps } from "../src/theming/Layout/LayoutHeader";

const LayoutHeader = dynamic(() => import("../src/theming/Layout/LayoutHeader"));

type MHDocumentProps = ILayoutHeaderProps & DocumentProps;

export default class MHDocument extends Document<MHDocumentProps> {
    static async getInitialProps(ctx: DocumentContext): Promise<MHDocumentProps> {
        const [documentProps, headerProps] = await Promise.all([
            Document.getInitialProps(ctx),
            MHDocument.getHeaderProps(ctx),
        ]);

        return { ...(documentProps as DocumentContext & DocumentProps), ...headerProps };
    }
    static async getHeaderProps(ctx: DocumentContext): Promise<ILayoutHeaderProps> {
        const language = negotiateLanguage(ctx, true);

        return { language };
    }

    render() {
        return (
            <Html lang={this.props.language}>
                <Head>
                    <LayoutHeader language={this.props.language} />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
