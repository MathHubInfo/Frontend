import * as React from "react";

import { Tab } from "semantic-ui-react";

import { IDocument } from "../../../api";
import { withContext } from "../../../context";

import { LibraryItem } from "..";
import { decodeLibraryLinkID, ILibraryRouteProps } from "../structure/links";
import NarrativeElementContentList from "./content";

/** a single document */
class Document extends React.Component<ILibraryRouteProps> {
    constructor(props: ILibraryRouteProps) {
        super(props);
        this.getID = this.getID.bind(this);
        this.getDocument = this.getDocument.bind(this);
        this.getDocumentProps = this.getDocumentProps.bind(this);
        this.getDocumentBody = this.getDocumentBody.bind(this);
    }

    private getID() { return decodeLibraryLinkID(this.props); }
    private getDocument() { return this.props.context.client.getDocument(this.getID()); }
    private getDocumentProps(document: IDocument) {
        const {id: title, sourceRef: source, statistics, tags} = document;
        const crumbs = source || document;
        const jupyter = (tags && tags.indexOf("ipynb-omdoc") > -1) ? source : undefined;
        return { title, crumbs, source, jupyter, statistics };
    }
    private getDocumentBody(document: IDocument) {
        return (
            <Tab
                panes={[
                    { menuItem: "Content", render: () => <Tab.Pane>
                        <NarrativeElementContentList elements={document.decls} />
                    </Tab.Pane> },
                    {
                        menuItem: "Graph", render: () =>
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

export default withContext(Document);
