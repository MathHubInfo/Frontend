import * as React from "react";

import { Breadcrumb, Card, Container, Divider, Header, Label } from "semantic-ui-react";
import { LoadWithPromise } from "../components/common/lazy";
import { Nav } from "../components/common/nav";

import { IMathHubContext, WithContext } from "../context";
import { IArchive, IDocument, INarrativeElement } from "../context/api";

import { MHTitle } from "../utils/title";

interface IArchiveProps {
    match: {
        params: {
            id: string,
        },
    };
}

export const Archive = WithContext((context: IMathHubContext) => class extends React.Component<IArchiveProps> {
    constructor(props: IArchiveProps) {
        super(props);
        this.getArchive = this.getArchive.bind(this);
    }

    private archiveID() { return `${this.props.match.params.id}`; }
    private getArchive() { return context.client.getArchive(this.archiveID()); }

    public render() {
        return (
            <MHTitle title={this.archiveID()}>
                <LoadWithPromise
                    title={this.archiveID()}
                    promise={this.getArchive}
                    errorMessage={true}
                >{(archive: IArchive) =>
                    <>
                        <>
                             <Breadcrumb style={{margin: "0em 0em 1em"}}>
                                <Breadcrumb.Section as={Nav} to={`/content`}>
                                    Library
                                </Breadcrumb.Section>
                                <Breadcrumb.Divider />
                                <Breadcrumb.Section as={Nav} to={`/content/${archive.parent.id}`}>
                                    <div dangerouslySetInnerHTML={{__html: archive.parent.id}} />
                                </Breadcrumb.Section>
                                <Breadcrumb.Divider />
                                <Breadcrumb.Section as={Nav} to={`/content/` + this.archiveID()}>
                                    <div dangerouslySetInnerHTML={{__html: archive.name}} />
                                </Breadcrumb.Section>
                                <Breadcrumb.Divider />
                            </Breadcrumb>
                            <>
                                <Header as="h2">
                                    <div dangerouslySetInnerHTML={{__html: archive.title}} />
                                </Header>
                                <div dangerouslySetInnerHTML={{__html: archive.description}} />
                                <>
                                    <b>Responsible:</b> {archive.responsible.map((p) => <Label key={p}>{p}</Label>)}
                                </>
                            </>
                            <Divider />
                            <Container>{
                                <DocumentItemList nRoot={archive.narrativeRoot} />}
                            </Container>
                        </>
                    </>
                }
                </LoadWithPromise>
            </MHTitle>
        );
    }
});

class DocumentItemList extends React.Component<{nRoot?: IDocument}> {
    public render() {
        const {nRoot} = this.props;
        if (nRoot !== undefined) {
            return (
                <Card.Group itemsPerRow="1">
                    {nRoot.decls.map((narrative) => <DocumentListItem key={narrative.id} narrative={narrative} />)}
                </Card.Group>
            );
        } else {
            return(
                <>
                    This Archive is empty.
                </>
            );
        }
    }
}

class DocumentListItem extends React.Component<{narrative: INarrativeElement}> {
    public render() {
        const {narrative} = this.props;
        return (
            <Card>
                <Card.Content>
                    <Card.Header
                        as={Nav}
                        to={`/content/${narrative.id}`}
                    >
                        <div dangerouslySetInnerHTML={{__html: narrative.name}} />
                    </Card.Header>
                </Card.Content>
            </Card>
        );
    }
}
