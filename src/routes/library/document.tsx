import * as React from "react";

import { Container, Header, Tab } from "semantic-ui-react";

import { MHRefBreadCrumbs } from "../../components/breadcrumbs";
import { LoadWithSpinner } from "../../components/common/lazy";

import { IMathHubContext, WithContext } from "../../context";
import { IDocument } from "../../context/api";

import { MHTitle } from "../../utils/title";

import { decodeLibraryLinkID, ILibraryRouteProps } from "./";
import { DocumentItemList } from "./NarrativeElements/DocumentItemList";
import { ModuleSource, ModuleView } from "./NarrativeElements/module";
import { StatisticsTable } from "./NarrativeElements/Statistics";

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
                                <div dangerouslySetInnerHTML={{ __html: document.name }} />
                            </Header>
                        </Container>
                        <Tab
                            panes={[
                                {
                                    menuItem: "View", render: () =>
                                        <ModuleView decls={document.decls} context={context} />,
                                },
                                {
                                    menuItem: "source", render: () =>
                                        <ModuleSource decls={document.decls} context={context} />,
                                },
                                {
                                    menuItem: "statistics", render: () =>
                                        <StatisticsTable statistics={document.statistics} />,
                                },
                                {
                                    menuItem: "graph", render: () =>
                                        <Tab.Pane attached={false}>TGView will be added later</Tab.Pane>,
                                },
                                {
                                    menuItem: "documents", render: () =>
                                        <DocumentItemList nRoot={document.decls} />,
                                },
                            ]}
                        />
                    </>
                    }
                </LoadWithSpinner>
            </MHTitle>
        );
    }
});
