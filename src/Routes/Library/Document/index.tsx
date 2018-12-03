import * as React from "react";
import { Tab } from "semantic-ui-react";

import { IDocument } from "../../../Clients/LibraryClient/objects";
import { IRouteComponentProps } from "../../../Routing/makeRouteComponent";
import Item from "../Item";

import Content from "./Content";

// a single Document
// tslint:disable-next-line:export-name
export default class Document extends React.Component<IRouteComponentProps<IDocument, {id: string}>> {
    render() {
        const title = this.props.serverInfo ? this.props.serverInfo.title : this.props.params.id;

        return <Item title={title} props={Document.getDocumentProps} {...this.props}>{Document.getDocumentBody}</Item>;
    }

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
