import * as React from "react";

import { decodeLibraryLinkID, ILibraryRouteProps } from "../structure/links";

import { IArchive } from "../../../api";
import { withContext } from "../../../context";

import { LibraryItem } from "..";
import NarrativeElementContentList from "../narrative/content";

/** a single archive */
class Archive extends React.Component<ILibraryRouteProps> {
    constructor(props: ILibraryRouteProps) {
        super(props);
        this.getID = this.getID.bind(this);
        this.getArchive = this.getArchive.bind(this);
        this.getArchiveProps = this.getArchiveProps.bind(this);
        this.getArchiveBody = this.getArchiveBody.bind(this);
    }

    private getID() { return decodeLibraryLinkID(this.props); }
    private getArchive() { return this.props.context.client.getArchive(this.getID()); }
    private getArchiveProps(archive: IArchive) {
        return {
            title: archive.title,
            crumbs: archive,
            statistics: archive.statistics,
            description: archive.description,
            responsible: archive.responsible,
        };
    }
    private getArchiveBody(archive: IArchive) {
        return <NarrativeElementContentList elements={archive.narrativeRoot.decls} />;
    }

    public render() {
        return (
            <LibraryItem title={this.getID()} promise={this.getArchive} props={this.getArchiveProps} {...this.props}>{
                this.getArchiveBody}</LibraryItem>
        );
    }
}

export default withContext(Archive);
