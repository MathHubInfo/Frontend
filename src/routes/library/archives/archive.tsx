import * as React from "react";

import { decodeLibraryLinkID, encodeLibraryLink, ILibraryRouteProps } from "../structure/links";

import { IArchive, ITagRef } from "../../../api";
import { withContext } from "../../../context";

import { Button, Container, Divider } from "semantic-ui-react";
import { LibraryItem } from "..";
import { Nav } from "../../../components/common/nav";
import NarrativeElementContentList from "../document/content";

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
        return (
            <>
                <Container>
                    Tags: {archive.tags.map((t) => <TagLink key={t.id} to={t} />)}
                </Container>
                <Divider />
                <NarrativeElementContentList elements={archive.narrativeRoot.decls} />
            </>
        );
    }

    public render() {
        return (
            <LibraryItem title={this.getID()} promise={this.getArchive} props={this.getArchiveProps} {...this.props}>{
                this.getArchiveBody}</LibraryItem>
        );
    }
}

export default withContext(Archive);

function TagLink(props: {to: ITagRef}) {
    const {to: tag} = props;
    return <Button size="mini" as={Nav} to={encodeLibraryLink(tag)}>{tag.name}</Button>;
}
