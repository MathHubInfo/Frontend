import { NextContext } from "next";
import * as React from "react";
import intl from "react-intl-universal";

import getContext from "../../src/context";
import { INewsItem } from "../../src/context/NewsClient";
import getDerivedParameter, { failed, IDerivedParameter, statusCode } from "../../src/utils/getDerivedParameter";

import LayoutBody from "../../src/theming/Layout/LayoutBody";
import LayoutFailure from "../../src/theming/Layout/LayoutFailure";
import PageNewsPage from "../../src/theming/Pages/News/PageNewsPage";


type IPageProps = IDerivedParameter<INewsItem>;

export default class Page extends React.Component<IPageProps> {
    static async getInitialProps({res, query}: NextContext): Promise<IPageProps> {
        return getDerivedParameter(
            "id",
            async (id: string) => getContext().newsClient.load(id),
            query,
            res,
        );
    }
    render() {
        const crumbs = [{href: "/", title: intl.get("home")}, {href: "/news", title: intl.get("news")}];
        if (failed(this.props)) return (
            <LayoutFailure
                crumbs={crumbs}
                statusCode={statusCode(this.props.status)}
                status={this.props.status}
            />
        );

        const {item} = this.props;

        return (
            <LayoutBody crumbs={crumbs} title={[item.title, "News"]} description={item.teaser}>
                <PageNewsPage {...item} />
            </LayoutBody>
        );
    }
}
