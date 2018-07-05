import * as React from "react";

import { Button, Container, Header, Tab } from "semantic-ui-react";

import { MHRefBreadCrumbs } from "../../components/breadcrumbs";
import { LoadWithSpinner } from "../../components/common/lazy";

import { IMathHubContext, WithContext } from "../../context";
import { IDocument } from "../../context/api";

import { MHTitle } from "../../utils/title";

import { decodeLibraryLinkID, ILibraryRouteProps } from "./";
import { DocumentItemList } from "./NarrativeElements/DocumentItemList";
import { ModuleSource, ModuleView } from "./NarrativeElements/module";

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
                <LoadWithSpinner
                    title={this.documentID()}
                    promise={this.getDocument}
                    errorMessage={true}
                >{(document: IDocument) =>
                    <>
                        <MHRefBreadCrumbs to={document} />
                        <Container text>
                            <Header as="h2">
                                <div dangerouslySetInnerHTML={{__html: document.name}} />
                            </Header>
                            </Container>
                        <Tab
                                menu={{ secondary: true, pointing: true }}
                                panes={[
                                    { menuItem: "View", render: () =>
                                        <ModuleView decls={document.decls} context={context} /> },
                                    { menuItem: "source", render: () =>
                                        <ModuleSource decls={document.decls} context={context} /> },
                                    { menuItem: "Metadata", render: () =>
                                        <>
                                            <Button>Run</Button>
                                            <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>
                                        </> },
                                    { menuItem: "graph", render: () =>
                                        <Tab.Pane attached={false}>TGView will be added later</Tab.Pane> },
                                    { menuItem: "documents", render: () =>
                                        <DocumentItemList nRoot={document.decls} /> },
                                  ]}
                        />
                    </>
                }
                </LoadWithSpinner>
            </MHTitle>
        );
    }
});
