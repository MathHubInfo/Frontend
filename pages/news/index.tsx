import { GetServerSidePropsResult } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import getMathHubConfig from "../../src/context";
import { INewsItem } from "../../src/context/NewsClient";
import { TranslateProps, WithTranslate } from "../../src/locales/WithTranslate";

const LayoutBody = dynamic(() => import("../../src/theming/Layout/LayoutBody"));

const PageNews = dynamic(() => import("../../src/theming/Pages/News/PageNews"));
const PageNewsPageRef = dynamic(() => import("../../src/theming/Pages/News/PageNewsPageRef"));

interface INewsProps {
    items: INewsItem[];
}

class News extends React.Component<INewsProps & TranslateProps> {
    render() {
        const { t, items } = this.props;
        const crumbs = [{ href: "/", title: t("home") }];

        const description = t("news intro");

        return (
            <LayoutBody crumbs={crumbs} description={description} title={["News"]}>
                <PageNews description={description}>
                    {items.map(n => (
                        <PageNewsPageRef key={n.id} item={n} link={{ href: "/news/[id]", params: { id: n.id } }} />
                    ))}
                </PageNews>
            </LayoutBody>
        );
    }
}

export default WithTranslate<INewsProps & TranslateProps>(News);

export const getServerSideProps = async (): Promise<GetServerSidePropsResult<INewsProps>> => {
    const items = await getMathHubConfig().newsClient.loadAll();
    return {
        props: { items },
    };
};
