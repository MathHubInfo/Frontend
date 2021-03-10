import { GetServerSidePropsResult } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import { Card, Container, Divider, Icon, List } from "semantic-ui-react";
import MHHTML from "../../src/components/MHHTML";
import MHLink, { IMHLinkable } from "../../src/components/MHLink";
import getMathHubConfig from "../../src/context";
import { INewsItem } from "../../src/context/NewsClient";
import { TranslateProps, WithTranslate } from "../../src/locales/WithTranslate";

const LayoutBody = dynamic(() => import("../../src/theming/Layout/LayoutBody"));

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
                <Container>
                    <h1>News</h1>
                    <div>{description}</div>
                    <Divider />
                    <List relaxed>
                        {items.map(n => (
                            <List.Item key={n.id}>
                                <PageNewsPageRef item={n} link={{ href: "/news/[id]", params: { id: n.id } }} />
                            </List.Item>
                        ))}
                    </List>
                </Container>
            </LayoutBody>
        );
    }
}

export default WithTranslate<INewsProps & TranslateProps>(News);

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
