import * as React from "react";

import { decodeLibraryLinkID, ILibraryRouteProps } from "../structure/links";

import { IGroup, ISourceReference } from "../../../clients";
import { GroupObjectToRef } from "../../../clients/utils";

import { withContext } from "../../../context";

import { LibraryItem } from "..";
import { ContentItemList } from "./list";

/** a single group */
class Group extends React.Component<ILibraryRouteProps> {
    constructor(props: ILibraryRouteProps) {
        super(props);
        this.getID = this.getID.bind(this);
        this.getGroup = this.getGroup.bind(this);
        this.getGroupProps = this.getGroupProps.bind(this);
        this.getGroupBody = this.getGroupBody.bind(this);
    }

    private getID() { return decodeLibraryLinkID(this.props); }
    private getGroup() { return this.props.context.client.getGroup(this.getID()); }
    private getGroupProps(group: IGroup) {
        const {title, statistics, description, responsible} = group;
        const source: ISourceReference = {
            kind: "source",
            ref: true,
            parent: GroupObjectToRef(group),
        };
        return { title, crumbs: group, source, statistics, description, responsible};
    }
    private getGroupBody(group: IGroup) {
        return <ContentItemList items={group.archives} />;
    }

    public render() {
        return (
            <LibraryItem title={this.getID()} promise={this.getGroup} props={this.getGroupProps} {...this.props}>{
                this.getGroupBody}</LibraryItem>
        );
    }
}

export default withContext(Group);
