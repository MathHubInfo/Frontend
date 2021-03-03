import React from "react";

import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MHDocument extends Document {
    render() {
        const { locale } = this.props;
        return (
            <Html lang={locale}>
                <Head>
                    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
