import * as React from "react";
import { Tab } from "semantic-ui-react";

import { IDocument } from "../../../Clients/MMTClient/objects";
import { withContext } from "../../../Context";
import Item from "../Item";
import { decodeLibraryLinkID, ILibraryRouteProps } from "../Structure/Links";

import Content from "./Content";

// a single Document
class Document extends React.Component<ILibraryRouteProps> {
    render() {
        const title = this.getID();

        return (
            <Item title={title} promise={this.getDocument} props={Document.getDocumentProps} {...this.props}>{
                Document.getDocumentBody}</Item>
        );
    }

    private readonly getID = () => decodeLibraryLinkID(this.props);
    private readonly getDocument = async () => this.props.context.mmtClient.getDocument(this.getID());

    private static readonly getDocumentProps = (document: IDocument) => {
        const {id: title, sourceRef: source, statistics, tags} = document;
        const crumbs = source || document;
        const jupyter = (tags && tags.indexOf("ipynb-omdoc") > -1) ? source : undefined;

        return { title, crumbs, source, jupyter, statistics };
    }
    private static readonly getDocumentBody = (document: IDocument) => {
        return (
            <Tab
                panes={[
                    { menuItem: "Content", render: () => <Tab.Pane>
                        <Content elements={document.decls} />
                    </Tab.Pane> },
                    {
                        menuItem: "Graph", render: () =>
                            <Tab.Pane attached={false}>TGView will be added later</Tab.Pane>,
                    },
                ]}
            />
        );
    }
}

// tslint:disable-next-line:export-name
export default withContext(Document);
