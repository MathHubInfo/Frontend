import * as React from "react";

import { Container, Divider, Header } from "semantic-ui-react";

import { MHRefBreadCrumbs } from "../../components/breadcrumbs";
import { LoadWithSpinner } from "../../components/common/lazy";

import { IMathHubContext, WithContext } from "../../context";
import { IDocument } from "../../context/api";

import { MHTitle } from "../../utils/title";

import { decodeLibraryLinkID, ILibraryRouteProps } from "./";
import { DocumentItemList } from "./DocumentItemList";

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
                                <div dangerouslySetInnerHTML={{__html: document.id}} />
                            </Header>
                            <div>{document.decls.length}</div>
                        </Container>
                        <Divider />
                        <Container>{
                            <DocumentItemList nRoot={document.decls} />}
                        </Container>
                    </>
                }
                </LoadWithSpinner>
            </MHTitle>
        );
    }
});
