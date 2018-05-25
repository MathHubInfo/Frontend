import * as React from "react";

import { Breadcrumb, Card, Container, Divider, Header, Label } from "semantic-ui-react";
import { LoadWithPromise } from "../components/common/lazy";
import { Nav } from "../components/common/nav";

import { IMathHubContext, WithContext } from "../context";
import {IArchive, IDocumentItem} from "../context/api";

import { MHTitle } from "../utils/title";

interface IArchiveProps {
    match: {
        params: {
            group: string,
            name: string,
        },
    };
}

export const Archive = WithContext((context: IMathHubContext) => class extends React.Component<IArchiveProps> {
    constructor(props: IArchiveProps) {
        super(props);
        this.getArchive = this.getArchive.bind(this);
    }

    private archiveID() { return this.props.match.params.group + "/" + this.props.match.params.name; }
    private getArchive() { return context.client.getArchive(this.archiveID()); }

    public render() {
        return (
            <MHTitle title={this.archiveID()}>
                <LoadWithPromise
                    title={this.archiveID()}
                    promise={this.getArchive}
                    errorMessage={true}
                >{(archive: IArchive) =>
                    <div>
                        <div>
                             <Breadcrumb style={{margin: "0em 0em 1em"}}>
                                <Breadcrumb.Section as={Nav} to={`/content`}>
                                    Library
                                </Breadcrumb.Section>
                                <Breadcrumb.Divider />
                                <Breadcrumb.Section as={Nav} to={`/content/${archive.group}`}>
                                    <div dangerouslySetInnerHTML={{__html: archive.group}} />
                                </Breadcrumb.Section>
                                <Breadcrumb.Divider />
                                <Breadcrumb.Section as={Nav} to={`/content/` + this.archiveID()}>
                                    <div dangerouslySetInnerHTML={{__html: archive.id}} />
                                </Breadcrumb.Section>
                                <Breadcrumb.Divider />
                            </Breadcrumb>
                            <Container text>
                                <Header as="h2">
                                    <div dangerouslySetInnerHTML={{__html: archive.title}} />
                                </Header>
                                <div dangerouslySetInnerHTML={{__html: archive.description}} />
                                <div>
                                    <b>Responsible:</b> {archive.responsible.map((p) => <Label key={p}>{p}</Label>)}
                                </div>
                            </Container>
                            <Divider />
                            <Container>
                                <DocumentItemList documents={archive.documents} />
                            </Container>
                        </div>
                    </div>
                }
                </LoadWithPromise>
            </MHTitle>
        );
    }
});

class DocumentItemList extends React.Component<{documents: IDocumentItem[]}> {
    public render() {
        const {documents} = this.props;
        return (
            <Card.Group itemsPerRow="1">
                {documents.map((document) => <DocumentListItem key={document.id} document={document} />)}
            </Card.Group>
        );
    }
}

/** A single document item */
class DocumentListItem extends React.Component<{document: IDocumentItem}> {
    public render() {
        const {document} = this.props;
        return (
            <Card>
                <Card.Content>
                    <Card.Header
                        as={Nav}
                        to={`/content/${document.group}/${document.archive}/${document.id}`}
                    >
                        <div dangerouslySetInnerHTML={{__html: document.id}} />
                    </Card.Header>
                    <Card.Description>{document.name}</Card.Description>
                </Card.Content>
            </Card>
        );
    }
}
