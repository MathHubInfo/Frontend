import { GetServerSidePropsResult } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import getMathHubConfig from "../../src/context";
import { IGroupRef } from "../../src/context/LibraryClient/objects";
import { TranslateProps, WithTranslate } from "../../src/locales/WithTranslate";

const ActionHeader = dynamic(() => import("../../src/theming/Layout/ActionHeader"));
const LayoutBody = dynamic(() => import("../../src/theming/Layout/LayoutBody"));

const PageRef = dynamic(() => import("../../src/theming/Pages/Library/PageRef"));
const PageLibrary = dynamic(() => import("../../src/theming/Pages/Library/PageLibrary"));

interface ILibraryProps {
    groups: IGroupRef[];
}

class Library extends React.Component<ILibraryProps & TranslateProps> {
    render() {
        const { t, groups } = this.props;

        const crumbs = [{ href: "/", title: t("home") }];
        const title = t("library");
        const description = t("library intro");

        // the header for the library contains only the description
        const header = <ActionHeader description={description} />;

        return (
            <LayoutBody crumbs={crumbs} description={description} title={[title]}>
                <PageLibrary header={header}>
                    {groups.map(g => (
                        <PageRef key={g.id} item={g} link={{ href: g }} />
                    ))}
                </PageLibrary>
            </LayoutBody>
        );
    }
}

export default WithTranslate<ILibraryProps & TranslateProps>(Library);

export const getServerSideProps = async (): Promise<GetServerSidePropsResult<ILibraryProps>> => {
    const groups = await getMathHubConfig().libraryClient.getGroups();
    return {
        props: { groups },
    };
};
