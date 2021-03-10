import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import getMathHubConfig from "../../src/context";
import { INewsItem } from "../../src/context/NewsClient";
import { TranslateProps, WithTranslate } from "../../src/locales/WithTranslate";
import { Container, Header, Segment } from "semantic-ui-react";
import MHHTML from "../../src/components/MHHTML";

const LayoutBody = dynamic(() => import("../../src/theming/Layout/LayoutBody"));

interface IPageProps {
    item: INewsItem;
}

class Page extends React.Component<IPageProps & TranslateProps> {
    render() {
        const {
            t,
            item: { title, date, content, teaser },
        } = this.props;
        const theDate = new Date(date * 1000);

        const crumbs = [
            { href: "/", title: t("home") },
            { href: "/news", title: t("news") },
        ];

        return (
            <LayoutBody crumbs={crumbs} title={[title, "News"]} description={teaser}>
                <Container>
                    <Header as="h2" attached="top">
                        <MHHTML>{title}</MHHTML>
                        <Header.Subheader>{theDate.toDateString()}</Header.Subheader>
                    </Header>
                    <Segment attached>
                        <MHHTML>{content}</MHHTML>
                    </Segment>
                </Container>
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
