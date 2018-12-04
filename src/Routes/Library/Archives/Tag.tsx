import * as React from "react";

import { ITag } from "../../../Clients/LibraryClient/objects";
import { withContext } from "../../../Context";
import Item from "../Item";
import { decodeLibraryLinkID, ILibraryRouteProps } from "../Structure/Links";

import { List } from "./List";

class Tag extends React.Component<ILibraryRouteProps> {
    render() {
        return (
            <Item title={this.getID()} promise={this.getTag} props={Tag.getTagProps} {...this.props}>{
                Tag.getTagBody}</Item>
        );
    }

    private readonly getID = () => decodeLibraryLinkID(this.props);
    private readonly getTag = async () => this.props.context.libraryClient.getTag(this.getID());

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

// tslint:disable-next-line:export-name
export default withContext(Tag);
