import * as React from "react";

import { IGroup, ISourceReference } from "../../../Clients/LibraryClient/objects";
import { GroupObjectToRef } from "../../../Clients/LibraryClient/objects/utils";
import { withContext } from "../../../Context";
import Item from "../Item";
import { decodeLibraryLinkID, ILibraryRouteProps } from "../Structure/Links";

import { List } from "./List";

class Group extends React.Component<ILibraryRouteProps> {
    render() {
        return (
            <Item title={this.getID()} promise={this.getGroup} props={Group.getGroupProps} {...this.props}>{
                Group.getGroupBody}</Item>
        );
    }

    private readonly getID = () => decodeLibraryLinkID(this.props);
    private readonly getGroup = async () => this.props.context.libraryClient.getGroup(this.getID());
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

// tslint:disable-next-line:export-name
export default withContext(Group);
