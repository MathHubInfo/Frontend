import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import getMathHubConfig from "../../src/context";
import { IGroup } from "../../src/context/LibraryClient/objects";
import { headerProps } from "../../src/library/utils";
import { TranslateProps, WithTranslate } from "../../src/locales/WithTranslate";
import GetDerivedParameter, { failed, IDerivedParameter, statusCode } from "../../src/utils/GetDerivedParameter";

const ActionHeader = dynamic(() => import("../../src/theming/Layout/ActionHeader"));
const LayoutBody = dynamic(() => import("../../src/theming/Layout/LayoutBody"));
const LayoutFailure = dynamic(() => import("../../src/theming/Layout/LayoutFailure"));

const PageRef = dynamic(() => import("../../src/theming/Pages/Library/PageRef"));
const PageGroup = dynamic(() => import("../../src/theming/Pages/Library/PageGroup"));

type IGroupProps = IDerivedParameter<IGroup>;

class Group extends React.Component<IGroupProps & TranslateProps> {
    static async getInitialProps({ res, query }: NextPageContext): Promise<IGroupProps> {
        return GetDerivedParameter(
            "id",
            async (id: string) => getMathHubConfig().libraryClient.getGroup(id),
            query,
            res,
        );
    }
    render() {
        const { t } = this.props;
        const crumbs = [
            { href: "/", title: t("home") },
            { href: "/library", title: t("library") },
        ];
        if (failed(this.props))
            return (
                <LayoutFailure crumbs={crumbs} statusCode={statusCode(this.props.status)} status={this.props.status} />
            );

        const { description, declarations: archives, name } = this.props.item;
        const header = <ActionHeader {...headerProps(this.props.item, { description })} />;

        return (
            <LayoutBody crumbs={crumbs} description={description} title={[name]}>
                <PageGroup header={header} item={this.props.item}>
                    {archives.map(a => (
                        <PageRef key={a.id} item={a} link={{ href: "/library/archive", query: { id: a.id } }} />
                    ))}
                </PageGroup>
            </LayoutBody>
        );
    }
}

export default WithTranslate<IGroupProps & TranslateProps>(Group);
