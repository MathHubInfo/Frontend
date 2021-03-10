import { GetServerSidePropsResult } from "next";
import { Container, List } from "semantic-ui-react";
import dynamic from "next/dynamic";
import * as React from "react";
import getMathHubConfig from "../../src/context";
import { IGroupRef } from "../../src/context/LibraryClient/objects";
import { TranslateProps, WithTranslate } from "../../src/locales/WithTranslate";
import { CompareStrings } from "../../src/utils/Compare";

const ActionHeader = dynamic(() => import("../../src/theming/Layout/ActionHeader"));
const LayoutBody = dynamic(() => import("../../src/theming/Layout/LayoutBody"));

const Ref = dynamic(() => import("../../src/library/Ref"));

interface ILibraryProps {
    groups: IGroupRef[];
}

class Library extends React.Component<ILibraryProps & TranslateProps> {
    render() {
        const { t, groups } = this.props;

        const crumbs = [{ href: "/", title: t("home") }];
        const title = t("library");
        const description = t("library intro");

        return (
            <LayoutBody crumbs={crumbs} description={description} title={[title]}>
                <Container>
                    <h1>{t("library")}</h1>
                    <ActionHeader description={description} />
                    <List relaxed>
                        {groups.map(g => (
                            <List.Item key={g.id}>
                                <Ref item={g} link={{ href: g }} />
                            </List.Item>
                        ))}
                    </List>
                </Container>
            </LayoutBody>
        );
    }
}

export default WithTranslate<ILibraryProps & TranslateProps>(Library);

export const getServerSideProps = async (): Promise<GetServerSidePropsResult<ILibraryProps>> => {
    // get the groups and sort them for a consistent order!
    const groups = await getMathHubConfig().libraryClient.getGroups();
    groups.sort(({ id: aid }, { id: bid }) => CompareStrings(aid, bid));

    return {
        props: { groups },
    };
};
