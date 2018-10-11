import * as React from "react";

import { Container, Header, Tab } from "semantic-ui-react";

import { MHRefBreadCrumbs } from "../../components/breadcrumbs";
import { LoadWithSpinner } from "../../components/common/lazy";
import { MathHTML } from "../../components/common/mathhtml";

import { IMathHubContext, WithContext } from "../../context";
import { IDocument } from "../../context/api";

import { MHTitle } from "../../utils/title";

import { DocumentItemList } from "./narrative/documentItemList";
import { ModuleSource, ModuleView } from "./narrative/module";
import { decodeLibraryLinkID, ILibraryRouteProps } from "./structure/links";
import { StatisticsTable } from "./structure/statistics";

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
                                <MathHTML>{document.name}</MathHTML>
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
