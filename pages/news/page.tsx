import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import getMathHubConfig from "../../src/context";
import { INewsItem } from "../../src/context/NewsClient";
import { TranslateProps, WithTranslate } from "../../src/locales/WithTranslate";
import GetDerivedParameter, { failed, IDerivedParameter, statusCode } from "../../src/utils/GetDerivedParameter";

const LayoutBody = dynamic(() => import("../../src/theming/Layout/LayoutBody"));
const LayoutFailure = dynamic(() => import("../../src/theming/Layout/LayoutFailure"));

const PageNewsPage = dynamic(() => import("../../src/theming/Pages/News/PageNewsPage"));

type IPageProps = IDerivedParameter<INewsItem>;

class Page extends React.Component<IPageProps & TranslateProps> {
    static async getInitialProps({ res, query }: NextPageContext): Promise<IPageProps> {
        return GetDerivedParameter("id", async (id: string) => getMathHubConfig().newsClient.load(id), query, res);
    }
    render() {
        const { t } = this.props;
        const crumbs = [
            { href: "/", title: t("home") },
            { href: "/news", title: t("news") },
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

export default WithTranslate<IPageProps & TranslateProps>(Page);
