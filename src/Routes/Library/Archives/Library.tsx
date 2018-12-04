import * as React from "react";

import { IGroupRef } from "../../../Clients/LibraryClient/objects";
import { withContext } from "../../../Context";
import Item from "../Item";
import { ILibraryRouteProps } from "../Structure/Links";

import { List } from "./List";

// The library, i.e. list of all groups
class Library extends React.Component<ILibraryRouteProps> {
    render() {
        return (
            <Item title="Library" promise={this.getGroups} props={Library.getGroupsProps} {...this.props}>{
                Library.getGroupsBody}</Item>
        );
    }

    private readonly getGroups = async () => this.props.context.libraryClient.getGroups();
    private static readonly getGroupsProps = (groups: IGroupRef[]) => {
        return {
            title: "Library",
            crumbs: undefined,
        };
    }
    private static readonly getGroupsBody = (groups: IGroupRef[]) => {
        return <List items={groups} />;
    }
}

// tslint:disable-next-line:export-name
export default withContext(Library);
