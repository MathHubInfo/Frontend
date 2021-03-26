import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import getMathHubConfig from "../../../src/context";
import { IGroup } from "../../../src/context/LibraryClient/objects";
import { decode } from "../../../src/utils/base64";
import { CompareStrings } from "../../../src/utils/Compare";
import { List } from "semantic-ui-react";

import Layout from "../../../src/layout";

const Ref = dynamic(() => import("../../../src/library/Ref"));

interface IGroupProps {
    group: IGroup;
}

export default class Group extends React.Component<IGroupProps> {
    render() {
        const { group } = this.props;
        const { declarations } = group;

        return (
            <Layout obj={group}>
                <List relaxed>
                    {declarations.map(a => (
                        <List.Item key={a.id}>
                            <Ref key={a.id} item={a} link={{ href: a }} />
                        </List.Item>
                    ))}
                </List>
            </Layout>
        );
    }
}

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
