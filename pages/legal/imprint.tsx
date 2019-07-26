import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import intl from "react-intl-universal";
import getDerivedParameter, { failed, IDerivedParameter, statusCode } from "../../src/utils/getDerivedParameter";


const LayoutBody = dynamic(() => import("../../src/theming/Layout/LayoutBody"));
const LayoutFailure = dynamic(() => import("../../src/theming/Layout/LayoutFailure"));

const PageLegalImprint = dynamic(() => import("../../src/theming/Pages/Legal/PageLegalImprint"));

type IImprintProps = IDerivedParameter<string>;

export default class Imprint extends React.Component<IImprintProps> {
    static async getInitialProps({res, query}: NextPageContext): Promise<IImprintProps> {
        return getDerivedParameter(
            undefined,
            async (_: string) => (await import("../../src/assets/legal/imprint.txt")).default,
            query,
            res,
        );
    }
    static readonly crumbs = [{href: "/", title: intl.get("home")}];
    render() {
        if (failed(this.props)) return (
            <LayoutFailure
                crumbs={Imprint.crumbs}
                statusCode={statusCode(this.props.status)}
                status={this.props.status}
            />
        );

        const {item} = this.props;

        return (
            <LayoutBody crumbs={Imprint.crumbs} title={[intl.get("imprint")]}>
                <PageLegalImprint imprint={item} />
            </LayoutBody>
        );
    }
}
