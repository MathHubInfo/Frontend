import * as React from "react";

import { ITag } from "../../../Clients/LibraryClient/objects";
import { IRouteComponentProps } from "../../../Routing/makeRouteComponent";
import Item from "../Item";

import { List } from "./List";

export default class Tag extends React.Component<IRouteComponentProps<ITag, {id: string}>> {
    render() {
        const title = this.props.serverInfo ? this.props.serverInfo.title : this.props.params.id;

        return (
            <Item title={title} props={Tag.getTagProps} {...this.props}>{Tag.getTagBody}</Item>
        );
    }

    private static readonly getTagProps = (tag: ITag) => {
        return {
            title: tag.name,
            crumbs: tag,
            statistics: tag.statistics,
        };
    }
    private static readonly getTagBody = (tag: ITag) => {
        return <List items={tag.archives} />;
    }
}
