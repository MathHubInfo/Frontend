import * as React from "react";

import { Tab } from "semantic-ui-react";

import { IMathHubContext } from "../../../context";
import { IDocument } from "../../../context/api";

import { LibraryItem } from "..";
import { decodeLibraryLinkID, ILibraryRouteProps } from "../structure/links";
import { NarrativeElementSourceList } from "./source";
import { NarrativeElementViewList } from "./view";

/** a single document */
export class Document extends React.Component<ILibraryRouteProps> {
    constructor(props: ILibraryRouteProps) {
        super(props);
        this.getID = this.getID.bind(this);
        this.getDocument = this.getDocument.bind(this);
        this.getDocumentProps = this.getDocumentProps.bind(this);
        this.getDocumentBody = this.getDocumentBody.bind(this);
    }

    private getID() { return decodeLibraryLinkID(this.props); }
    private getDocument(context: IMathHubContext) { return () => context.client.getDocument(this.getID()); }
    private getDocumentProps(document: IDocument) {
        return {
            title: document.id,
            crumbs: document,
            statistics: document.statistics,
        };
    }
    private getDocumentBody(document: IDocument) {
        return (
            <Tab
                panes={[
                    { menuItem: "View", render: () => <Tab.Pane>
                        <NarrativeElementViewList elements={document.decls} />
                    </Tab.Pane> },
                    { menuItem: "source", render: () => <Tab.Pane>
                        <NarrativeElementSourceList elements={document.decls} />
                    </Tab.Pane>},
                    {
                        menuItem: "graph", render: () =>
                            <Tab.Pane attached={false}>TGView will be added later</Tab.Pane>,
                    },
                ]}
            />
        );
    }

    public render() {
        return (
            <LibraryItem title={this.getID()} promise={this.getDocument} props={this.getDocumentProps} {...this.props}>{
                this.getDocumentBody}</LibraryItem>
        );
    }
}
