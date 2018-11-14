import * as React from "react";

import { decodeLibraryLinkID, ILibraryRouteProps } from "../structure/links";

import { ITag } from "../../../clients/mmt/objects";
import { withContext } from "../../../context";

import { LibraryItem } from "..";
import { ContentItemList } from "./list";

/** a single group */
class Tag extends React.Component<ILibraryRouteProps> {
    constructor(props: ILibraryRouteProps) {
        super(props);
        this.getID = this.getID.bind(this);
        this.getTag = this.getTag.bind(this);
        this.getTagProps = this.getTagProps.bind(this);
        this.getTagBody = this.getTagBody.bind(this);
    }

    private getID() { return decodeLibraryLinkID(this.props); }
    private getTag() { return this.props.context.mmtClient.getTag(this.getID()); }
    private getTagProps(tag: ITag) {
        return {
            title: tag.name,
            crumbs: tag,
            statistics: tag.statistics,
        };
    }
    private getTagBody(tag: ITag) {
        return <ContentItemList items={tag.archives} />;
    }

    public render() {
        return (
            <LibraryItem title={this.getID()} promise={this.getTag} props={this.getTagProps} {...this.props}>{
                this.getTagBody}</LibraryItem>
        );
    }
}

export default withContext(Tag);
