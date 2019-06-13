// tslint:disable:export-name
import * as React from "react";
import intl from "react-intl-universal";

import { NextContext } from "next";

import getContext from "../../src/context";
import { INewsItem } from "../../src/context/NewsClient";

import LayoutBody from "../../src/theming/Layout/LayoutBody";
import LayoutFailure from "../../src/theming/Layout/LayoutFailure";

import PageNews from "../../src/theming/Pages/News/PageNews";
import PageNewsPageRef from "../../src/theming/Pages/News/PageNewsPageRef";

import getDerivedParameter, { failed, IDerivedParameter, statusCode } from "../../src/utils/getDerivedParameter";


type INewsProps = IDerivedParameter<INewsItem[]>;

export default class News extends React.Component<INewsProps> {
    static async getInitialProps({ res, query }: NextContext): Promise<INewsProps> {
        return getDerivedParameter(
            undefined,
            async () => getContext().newsClient.loadAll(),
            query,
            res,
        );
    }
    static crumbs = [{ href: "/", title: "Home" }];
    render() {
        if (failed(this.props)) return (
            <LayoutFailure
                crumbs={News.crumbs}
                statusCode={statusCode(this.props.status)}
                status={this.props.status}
            />
        );

        const description = intl.get("news intro");


        return (
            <LayoutBody crumbs={News.crumbs} description={description} title={["News"]}>
                <PageNews description={description}>{this.props.item.map(n => <PageNewsPageRef
                    key={n.id}
                    item={n}
                    link={{ href: "/news/page", query: { id: n.id } }}
                />)}</PageNews>
            </LayoutBody>
        );
    }
}
