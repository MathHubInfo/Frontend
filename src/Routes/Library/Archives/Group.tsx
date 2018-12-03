import * as React from "react";

import { IGroup, ISourceReference } from "../../../Clients/LibraryClient/objects";
import { GroupObjectToRef } from "../../../Clients/LibraryClient/objects/utils";
import { IRouteComponentProps } from "../../../Routing/makeRouteComponent";
import Item from "../Item";

import { List } from "./List";

export default class Group extends React.Component<IRouteComponentProps<IGroup, {id: string}>> {
    render() {
        const title = this.props.serverInfo ? this.props.serverInfo.title : this.props.params.id;

        return <Item title={title} props={Group.getGroupProps}>{Group.getGroupBody}</Item>;
    }

    private static readonly getGroupProps = (group: IGroup) => {
        const {title, statistics, description, responsible} = group;
        const source: ISourceReference = {
            kind: "source",
            ref: true,
            parent: GroupObjectToRef(group),
        };

        return { title, crumbs: group, source, statistics, description, responsible};
    }
    private static readonly getGroupBody = (group: IGroup) => {
        return <List items={group.archives} />;
    }
}