import * as React from "react";

import { Breadcrumb, Container, Divider, Header } from "semantic-ui-react";
import { LoadWithPromise } from "../components/common/lazy";

import { IMathHubContext, WithContext } from "../context";
import { IDocument } from "../context/api";

import { MHTitle } from "../utils/title";

interface IDocumentProps {
    match: {
        params: {
            group: string,
            archive: string,
            name: string,
        },
    };
}

export const Document = WithContext((context: IMathHubContext) => class extends React.Component<IDocumentProps> {
    constructor(props: IDocumentProps) {
        super(props);
        this.getDocument = this.getDocument.bind(this);
    }

    private documentID() { return this.props.match.params.group + "/" +
                            this.props.match.params.archive + "/" + this.props.match.params.name; }
    private getDocument() { return context.client.getDocument(this.documentID()); }

    public render() {
        return (
            <MHTitle title={this.documentID()}>
                <LoadWithPromise
                    title={this.documentID()}
                    promise={this.getDocument}
                    errorMessage={true}
                >{(document: IDocument) =>
                    <div>
                        <div>
                             <Breadcrumb style={{margin: "0em 0em 1em"}}>
                                {/* TODO: Build dynamically
                                <Breadcrumb.Section as={Nav} to={`/content`}>
                                    Library
                                </Breadcrumb.Section>
                                <Breadcrumb.Divider />
                                <Breadcrumb.Section as={Nav} to={`/content/${document.par}`}>
                                    <div dangerouslySetInnerHTML={{__html: document.group}} />
                                </Breadcrumb.Section>
                                <Breadcrumb.Divider />
                                <Breadcrumb.Section as={Nav} to={`/content/${document.group}/${document.archive}`}>
                                    <div dangerouslySetInnerHTML={{__html: document.archive}} />
                                </Breadcrumb.Section>
                                <Breadcrumb.Divider />
                                <Breadcrumb.Section as={Nav} to={`/content/` + this.documentID()}>
                                    <div dangerouslySetInnerHTML={{__html: document.id}} />
                                </Breadcrumb.Section>
                                <Breadcrumb.Divider />
                                */}
                            </Breadcrumb>
                            <Container text>
                                <Header as="h2">
                                    <div dangerouslySetInnerHTML={{__html: document.id}} />
                                </Header>
                                <div dangerouslySetInnerHTML={{__html: document.name}} />
                            </Container>
                            <Divider />
                            <Container>{ /*
                                // TODO: Re-use element used in archive
                                <ModuleItemList modules={document.modules} />
                            */}</Container>
                        </div>
                    </div>
                }
                </LoadWithPromise>
            </MHTitle>
        );
    }
});

/*
class ModuleItemList extends React.Component<{modules: INarrativeElement[]}> {
    public render() {
        const {modules} = this.props;
        return (
            <Card.Group itemsPerRow="1">
                {modules.map((module) => <ModuleListItem key={module.name} module={module} />)}
            </Card.Group>
        );
    }
}

class ModuleListItem extends React.Component<{module: IModuleItem}> {
    public render() {
        const {module} = this.props;
        return (
            <Card>
                <Card.Content>
                    <Card.Header
                    >
                        <div dangerouslySetInnerHTML={{__html: module.name}} />
                    </Card.Header>
                    <Card.Description>{module.name}</Card.Description>
                </Card.Content>
            </Card>
        );
    }
}
*/
