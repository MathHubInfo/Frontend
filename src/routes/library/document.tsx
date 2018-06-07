import * as React from "react";

import { Container, Divider, Header } from "semantic-ui-react";

import { MHRefBreadCrumbs } from "../../components/breadcrumbs";
import { LoadWithPromise } from "../../components/common/lazy";

import { IMathHubContext, WithContext } from "../../context";
import { IDocument } from "../../context/api";

import { MHTitle } from "../../utils/title";

import { decodeLibraryLinkID, ILibraryRouteProps } from "./";

export const Document = WithContext((context: IMathHubContext) => class extends React.Component<ILibraryRouteProps> {
    constructor(props: ILibraryRouteProps) {
        super(props);
        this.getDocument = this.getDocument.bind(this);
    }

    private documentID() { return decodeLibraryLinkID(this.props.match.params.id); }
    private getDocument() { return context.client.getDocument(this.documentID()); }

    public render() {
        return (
            <MHTitle title={this.documentID()}>
                <LoadWithPromise
                    title={this.documentID()}
                    promise={this.getDocument}
                    errorMessage={true}
                >{(document: IDocument) =>
                    <>
                        <MHRefBreadCrumbs to={document} />
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
                    </>
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
