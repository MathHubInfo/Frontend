// tslint:disable:export-name
import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import intl from "react-intl-universal";
import getMathHubConfig from "../../src/context";
import { INewsItem } from "../../src/context/NewsClient";
import GetDerivedParameter, { failed, IDerivedParameter, statusCode } from "../../src/utils/GetDerivedParameter";

const LayoutBody = dynamic(() => import("../../src/theming/Layout/LayoutBody"));
const LayoutFailure = dynamic(() => import("../../src/theming/Layout/LayoutFailure"));

const PageNews = dynamic(() => import("../../src/theming/Pages/News/PageNews"));
const PageNewsPageRef = dynamic(() => import("../../src/theming/Pages/News/PageNewsPageRef"));

type INewsProps = IDerivedParameter<INewsItem[]>;

export default class News extends React.Component<INewsProps> {
    static async getInitialProps({ res, query }: NextPageContext): Promise<INewsProps> {
        return GetDerivedParameter(undefined, async () => getMathHubConfig().newsClient.loadAll(), query, res);
    }
    render() {
        const crumbs = [{ href: "/", title: intl.get("home") }];
        if (failed(this.props))
            return (
                <LayoutFailure crumbs={crumbs} statusCode={statusCode(this.props.status)} status={this.props.status} />
            );

        const description = intl.get("news intro");

        return (
            <LayoutBody crumbs={crumbs} description={description} title={["News"]}>
                <PageNews description={description}>
                    {this.props.item.map(n => (
                        <PageNewsPageRef key={n.id} item={n} link={{ href: "/news/page", query: { id: n.id } }} />
                    ))}
                </PageNews>
            </LayoutBody>
        );
    }
}
