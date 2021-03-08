import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import getMathHubConfig from "../../src/context";
import { INewsItem } from "../../src/context/NewsClient";
import { TranslateProps, WithTranslate } from "../../src/locales/WithTranslate";

const LayoutBody = dynamic(() => import("../../src/theming/Layout/LayoutBody"));
const PageNewsPage = dynamic(() => import("../../src/theming/Pages/News/PageNewsPage"));

interface IPageProps {
    item: INewsItem;
}

class Page extends React.Component<IPageProps & TranslateProps> {
    render() {
        const { t, item } = this.props;
        const crumbs = [
            { href: "/", title: t("home") },
            { href: "/news", title: t("news") },
        ];

        return (
            <LayoutBody crumbs={crumbs} title={[item.title, "News"]} description={item.teaser}>
                <PageNewsPage {...item} />
            </LayoutBody>
        );
    }
}

export default WithTranslate<IPageProps & TranslateProps>(Page);

export const getServerSideProps = async ({
    params,
}: GetServerSidePropsContext<{ id: string }>): Promise<GetServerSidePropsResult<IPageProps>> => {
    if (params === undefined) return { notFound: true };

    const item = await getMathHubConfig().newsClient.load(params.id);
    if (item === undefined) return { notFound: true };

    return {
        props: { item },
    };
};
