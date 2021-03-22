import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import getMathHubConfig from "../../../src/context";
import { IGroup } from "../../../src/context/LibraryClient/objects";
import { TranslateProps, WithTranslate } from "../../../src/locales/WithTranslate";
import { decode } from "../../../src/utils/base64";
import { CompareStrings } from "../../../src/utils/Compare";
import { List } from "semantic-ui-react";

const ActionHeader = dynamic(() => import("../../../src/layout/ActionHeader"));
const LayoutBody = dynamic(() => import("../../../src/layout/LayoutBody"));

const Ref = dynamic(() => import("../../../src/library/Ref"));

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

        return (
            <LayoutBody crumbs={crumbs} description={description} title={[name]}>
                <ActionHeader title={name} obj={group} description={description} />
                <List relaxed>
                    {declarations.map(a => (
                        <List.Item key={a.id}>
                            <Ref key={a.id} item={a} link={{ href: a }} />
                        </List.Item>
                    ))}
                </List>
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

    // sort contained archives for a consistent order!
    group.declarations.sort(({ id: aid }, { id: bid }) => CompareStrings(aid, bid));

    return {
        props: { group },
    };
};
