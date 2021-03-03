import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import getMathHubConfig from "../../src/context";
import { IGroupRef } from "../../src/context/LibraryClient/objects";
import { TranslateProps, WithTranslate } from "../../src/locales/WithTranslate";
import GetDerivedParameter, { failed, IDerivedParameter, statusCode } from "../../src/utils/GetDerivedParameter";

const ActionHeader = dynamic(() => import("../../src/theming/Layout/ActionHeader"));
const LayoutBody = dynamic(() => import("../../src/theming/Layout/LayoutBody"));
const LayoutFailure = dynamic(() => import("../../src/theming/Layout/LayoutFailure"));

const PageRef = dynamic(() => import("../../src/theming/Pages/Library/PageRef"));
const PageLibrary = dynamic(() => import("../../src/theming/Pages/Library/PageLibrary"));

type ILibraryProps = IDerivedParameter<IGroupRef[]>;

class Library extends React.Component<ILibraryProps & TranslateProps> {
    static async getInitialProps({ res, query }: NextPageContext): Promise<ILibraryProps> {
        return GetDerivedParameter(undefined, async () => getMathHubConfig().libraryClient.getGroups(), query, res);
    }
    render() {
        const { t } = this.props;
        const crumbs = [{ href: "/", title: t("home") }];
        if (failed(this.props))
            return (
                <LayoutFailure crumbs={crumbs} statusCode={statusCode(this.props.status)} status={this.props.status} />
            );

        const title = t("library");
        const description = t("library intro");
        // the header for the library contains only the description
        const header = <ActionHeader description={description} />;

        return (
            <LayoutBody crumbs={crumbs} description={description} title={[title]}>
                <PageLibrary header={header}>
                    {this.props.item.map(g => (
                        <PageRef key={g.id} item={g} link={{ href: "/library/group", query: { id: g.id } }} />
                    ))}
                </PageLibrary>
            </LayoutBody>
        );
    }
}

export default WithTranslate<ILibraryProps & TranslateProps>(Library);
