import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import intl from "react-intl-universal";
import getMathHubConfig from "../../src/context";
import { INewsItem } from "../../src/context/NewsClient";
import GetDerivedParameter, { failed, IDerivedParameter, statusCode } from "../../src/utils/GetDerivedParameter";

const LayoutBody = dynamic(() => import("../../src/theming/Layout/LayoutBody"));
const LayoutFailure = dynamic(() => import("../../src/theming/Layout/LayoutFailure"));

const PageNewsPage = dynamic(() => import("../../src/theming/Pages/News/PageNewsPage"));

type IPageProps = IDerivedParameter<INewsItem>;

export default class Page extends React.Component<IPageProps> {
    static async getInitialProps({ res, query }: NextPageContext): Promise<IPageProps> {
        return GetDerivedParameter("id", async (id: string) => getMathHubConfig().newsClient.load(id), query, res);
    }
    render() {
        const crumbs = [
            { href: "/", title: intl.get("home") },
            { href: "/news", title: intl.get("news") },
        ];
        if (failed(this.props))
            return (
                <LayoutFailure crumbs={crumbs} statusCode={statusCode(this.props.status)} status={this.props.status} />
            );

        const { item } = this.props;

        return (
            <LayoutBody crumbs={crumbs} title={[item.title, "News"]} description={item.teaser}>
                <PageNewsPage {...item} />
            </LayoutBody>
        );
    }
}
