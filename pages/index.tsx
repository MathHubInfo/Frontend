import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import intl from "react-intl-universal";
import GetDerivedParameter, { failed, IDerivedParameter, statusCode } from "../src/utils/GetDerivedParameter";

const LayoutBody = dynamic(() => import("../src/theming/Layout/LayoutBody"));
const LayoutFailure = dynamic(() => import("../src/theming/Layout/LayoutFailure"));
const PageHome = dynamic(() => import("../src/theming/Pages/PageHome"));

type IHomeProps = IDerivedParameter<string>;

export default class Home extends React.Component<IHomeProps> {
    static async getInitialProps({ res, query }: NextPageContext): Promise<IHomeProps> {
        return GetDerivedParameter(undefined, async () => (await import("../src/assets/home.txt")).default, query, res);
    }
    static crumbs = [];
    render() {
        if (failed(this.props))
            return (
                <LayoutFailure
                    crumbs={Home.crumbs}
                    statusCode={statusCode(this.props.status)}
                    status={this.props.status}
                />
            );
        const title = intl.get("home");

        return (
            <LayoutBody crumbs={Home.crumbs} title={[title]} description={this.props.item}>
                <PageHome>{this.props.item}</PageHome>
            </LayoutBody>
        );
    }
}
