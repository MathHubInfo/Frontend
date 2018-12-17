// tslint:disable:export-name
import * as React from "react";

import { NextContext } from "next";

import getContext from "../../src/context";
import { INewsItem } from "../../src/context/NewsClient";

import LayoutBody from "../../src/theming/Layout/LayoutBody";
import LayoutFailure from "../../src/theming/Layout/LayoutFailure";

import PageNews from "../../src/theming/Pages/News/PageNews";
import PageNewsPageRef from "../../src/theming/Pages/News/PageNewsPageRef";

import getDerivedParameter, { failed, IDerivedParameter, join2, statusCode } from "../../src/utils/getDerivedParameter";


type INewsProps = IDerivedParameter<[string, INewsItem[]]>;

export default class News extends React.Component<INewsProps> {
    static async getInitialProps({res, query}: NextContext): Promise<INewsProps> {
        return getDerivedParameter(
            undefined,
            join2(
                async () => (await import("../../src/assets/news.txt")).default,
                async () => getContext().newsClient.loadAll(),
            ),
            query,
            res,
        );
    }
    static crumbs = [{href: "/", title: "Home"}];
    render() {
        if (failed(this.props)) return (
            <LayoutFailure
                crumbs={News.crumbs}
                statusCode={statusCode(this.props.status)}
                status={this.props.status}
            />
        );

        const [description, news] = this.props.item;


        return (
            <LayoutBody crumbs={News.crumbs} description={description} title={["News"]}>
                <PageNews description={description}>{news.map(n => <PageNewsPageRef
                    key={n.id}
                    item={n}
                    link={{href: "/news/page", query: {id: n.id}}}
                />)}</PageNews>
            </LayoutBody>
        );
    }
}
