import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import { TranslateProps, WithTranslate } from "../../src/locales/WithTranslate";
import GetDerivedParameter, { failed, IDerivedParameter, statusCode } from "../../src/utils/GetDerivedParameter";

const LayoutBody = dynamic(() => import("../../src/theming/Layout/LayoutBody"));
const LayoutFailure = dynamic(() => import("../../src/theming/Layout/LayoutFailure"));

const PageLegalImprint = dynamic(() => import("../../src/theming/Pages/Legal/PageLegalImprint"));

type IImprintProps = IDerivedParameter<string>;

class Imprint extends React.Component<IImprintProps & TranslateProps> {
    static async getInitialProps({ res, query }: NextPageContext): Promise<IImprintProps> {
        return GetDerivedParameter(
            undefined,
            async () => (await import("../../src/assets/legal/imprint.txt")).default,
            query,
            res,
        );
    }
    render() {
        const { t } = this.props;

        const crumbs = [{ href: "/", title: t("home") }];

        if (failed(this.props))
            return (
                <LayoutFailure crumbs={crumbs} statusCode={statusCode(this.props.status)} status={this.props.status} />
            );

        const { item } = this.props;

        return (
            <LayoutBody crumbs={crumbs} title={[t("imprint")]}>
                <PageLegalImprint imprint={item} />
            </LayoutBody>
        );
    }
}

export default WithTranslate<IImprintProps & TranslateProps>(Imprint);
