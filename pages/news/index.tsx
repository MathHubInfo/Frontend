import { GetServerSidePropsResult } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import { Card, Divider, Icon, List } from "semantic-ui-react";
import MHHTML from "../../src/components/MHHTML";
import MHLink, { IMHLinkable } from "../../src/components/MHLink";
import getMathHubConfig from "../../src/context";
import { INewsItem } from "../../src/context/NewsClient";
import { TranslateProps, WithTranslate } from "../../src/locales/WithTranslate";

const Layout = dynamic(() => import("../../src/layout"));

interface INewsProps {
    items: INewsItem[];
}

class News extends React.Component<INewsProps & TranslateProps> {
    render() {
        const { t, items } = this.props;
        const crumbs = [{ href: "/", title: t("home") }];

        const description = t("news intro");

        /* TODO: Translate */
        return (
            <Layout crumbs={crumbs} description={description} title={"News"}>
                <Divider />
                <List relaxed>
                    {items.map(n => (
                        <List.Item key={n.id}>
                            <PageNewsPageRef item={n} link={{ href: "/news/[id]", params: { id: n.id } }} />
                        </List.Item>
                    ))}
                </List>
            </Layout>
        );
    }
}

export default WithTranslate(News);

interface INewsPageRefProps {
    link: IMHLinkable;
    item: INewsItem;
}

class PageNewsPageRef extends React.Component<INewsPageRefProps> {
    render() {
        const { title, teaser, date } = this.props.item;
        const theDate = new Date(date * 1000);

        const teaserDescription = teaser && (
            <Card.Content>
                <Card.Description>
                    <MHHTML>{teaser}</MHHTML>
                </Card.Description>
            </Card.Content>
        );

        return (
            <MHLink {...this.props.link}>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>
                            <MHHTML>{title}</MHHTML>
                        </Card.Header>
                    </Card.Content>
                    {teaserDescription}
                    <Card.Content extra>
                        <Icon name="globe" />
                        {theDate.toDateString()}
                    </Card.Content>
                </Card>
            </MHLink>
        );
    }
}

export const getServerSideProps = async (): Promise<GetServerSidePropsResult<INewsProps>> => {
    const items = await getMathHubConfig().newsClient.loadAll();
    return {
        props: { items },
    };
};
