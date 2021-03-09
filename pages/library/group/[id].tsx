import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import getMathHubConfig from "../../../src/context";
import { IGroup } from "../../../src/context/LibraryClient/objects";
import { headerProps } from "../../../src/library/utils";
import { TranslateProps, WithTranslate } from "../../../src/locales/WithTranslate";
import { decode } from "../../../src/utils/base64";

const ActionHeader = dynamic(() => import("../../../src/theming/Layout/ActionHeader"));
const LayoutBody = dynamic(() => import("../../../src/theming/Layout/LayoutBody"));

const PageRef = dynamic(() => import("../../../src/theming/Pages/Library/PageRef"));
const PageGroup = dynamic(() => import("../../../src/theming/Pages/Library/PageGroup"));

interface IGroupProps {
    group: IGroup;
}

class Group extends React.Component<IGroupProps & TranslateProps> {
    render() {
        const { t, group } = this.props;
        const { description, declarations, name } = group;

        const crumbs = [
            { href: "/", title: t("home") },
            { href: "/library", title: t("library") },
        ];

        const header = <ActionHeader {...headerProps(group, { description })} />;

        return (
            <LayoutBody crumbs={crumbs} description={description} title={[name]}>
                <PageGroup header={header} item={group}>
                    {declarations.map(a => (
                        <PageRef key={a.id} item={a} link={{ href: a }} />
                    ))}
                </PageGroup>
            </LayoutBody>
        );
    }
}

export default WithTranslate<IGroupProps & TranslateProps>(Group);

export const getServerSideProps = async ({
    params,
}: GetServerSidePropsContext<{ id: string }>): Promise<GetServerSidePropsResult<IGroupProps>> => {
    if (params === undefined) return { notFound: true };

    const group = await getMathHubConfig().libraryClient.getGroup(decode(params.id));
    if (group === undefined) return { notFound: true };

    return {
        props: { group },
    };
};
