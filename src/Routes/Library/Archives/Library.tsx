import * as React from "react";

import { IGroupRef } from "../../../Clients/LibraryClient/objects";
import { IRouteComponentProps } from "../../../Routing/makeRouteComponent";
import Item from "../Item";

import { List } from "./List";

// The library, i.e. list of all groups
export default class Library extends React.Component<IRouteComponentProps<IGroupRef[], {id: string}>> {
    render() {
        return <Item title="Library" props={Library.getGroupsProps} {...this.props}>{Library.getGroupsBody}</Item>;
    }

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
