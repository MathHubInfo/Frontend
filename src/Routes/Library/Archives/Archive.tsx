import * as React from "react";
import { Button, Container, Divider } from "semantic-ui-react";

import { IArchive, ISourceReference, ITagRef } from "../../../Clients/LibraryClient/objects";
import { ArchiveObjectToRef } from "../../../Clients/LibraryClient/objects/utils";
import { Nav } from "../../../Components/Common";
import { IRouteComponentProps } from "../../../Routing/makeRouteComponent";
import Content from "../Document/Content";
import Item from "../Item";
import { encodeLibraryLink } from "../Structure/Links";

export default class Archive extends React.Component<IRouteComponentProps<IArchive, {id: string}>> {
    render() {
        const title = this.props.serverInfo ? this.props.serverInfo.title : this.props.params.id;

        return <Item title={title} props={Archive.getArchiveProps} {...this.props}>{Archive.getArchiveBody}</Item>;
    }
    private static readonly getArchiveProps = (archive: IArchive) => {
        const {title, version, statistics, description, responsible} = archive;
        const source: ISourceReference = {
            kind: "source",
            ref: true,
            parent: ArchiveObjectToRef(archive),
            version,
        };

        return {title, crumbs: archive, source, statistics, description, responsible};
    }
    private static readonly getArchiveBody = (archive: IArchive) => {
        return (
            <>
                <Container>
                    Tags: {archive.tags.map(t => <TagLink key={t.id} to={t} />)}
                </Container>
                <Divider />
                <Content elements={archive.narrativeRoot.decls} />
            </>
        );
    }
}

class TagLink extends React.Component<{to: ITagRef}> {
    render() {
        const {to: tag} = this.props;

        return <Button size="mini" as={Nav} to={encodeLibraryLink(tag)}>{tag.name}</Button>;
    }
}
