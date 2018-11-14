import * as React from "react";

import { ILibraryRouteProps } from "../structure/links";

import { IGroupRef } from "../../../clients/mmt/objects";
import { withContext } from "../../../context";

import { LibraryItem } from "..";
import { ContentItemList } from "./list";

/** The library, i.e. list of all groups */
class Library extends React.Component<ILibraryRouteProps> {
    constructor(props: ILibraryRouteProps) {
        super(props);
        this.getGroups = this.getGroups.bind(this);
        this.getGroupsProps = this.getGroupsProps.bind(this);
        this.getGroupsBody = this.getGroupsBody.bind(this);
    }

    private getGroups() { return this.props.context.mmtClient.getGroups(); }
    private getGroupsProps(groups: IGroupRef[]) {
        return {
            title: "Library",
            crumbs: undefined,
        };
    }
    private getGroupsBody(groups: IGroupRef[]) {
        return <ContentItemList items={groups} />;
    }

    public render() {
        return (
            <LibraryItem title="Library" promise={this.getGroups} props={this.getGroupsProps} {...this.props}>{
                this.getGroupsBody}</LibraryItem>
        );
    }
}

export default withContext(Library);
