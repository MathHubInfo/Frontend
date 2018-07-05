import * as React from "react";

import { Button, Container, Header, List } from "semantic-ui-react";

import { MHRefBreadCrumbs } from "../../components/breadcrumbs";
import { LoadWithSpinner } from "../../components/common/lazy";

import { IMathHubContext, WithContext } from "../../context";
import { INotebook } from "../../context/api";

import { MHTitle } from "../../utils/title";

import { decodeLibraryLinkID, ILibraryRouteProps } from "./";

export const Notebook = WithContext((context: IMathHubContext) => class extends React.Component<ILibraryRouteProps> {
    constructor(props: ILibraryRouteProps) {
        super(props);
        this.getNotebook = this.getNotebook.bind(this);
    }

    private notebookID() { return decodeLibraryLinkID(this.props.match.params.id); }
    private getNotebook() { return context.client.getNotebook(this.notebookID()); }

    public render() {
        return (
            <MHTitle title={this.notebookID()}>
                <LoadWithSpinner
                    title={this.notebookID()}
                    promise={this.getNotebook}
                    errorMessage={true}
                >{(notebook: INotebook) =>
                    <>
                        <MHRefBreadCrumbs to={notebook} />
                        <Container text>
                            <Header as="h2">
                                <div dangerouslySetInnerHTML={{__html: notebook.name}} />
                                <Button floated={"right"} size={"massive"}>RUN</Button>
                            </Header>
                            <>
                                author: Kai<br />
                                date: 05.07.2018<br />
                                title: ExampleNotebook<br />
                            </>
                            <>kernelspec:</>
                            <List bulleted>
                                <List.Item>display_name: MMT</List.Item>
                                <List.Item>language: MMT</List.Item>
                                <List.Item>name: mmt</List.Item>
                            </List>
                            <>language_info:</>
                            <List bulleted>
                                <>language_info:</>
                                <List.Item>file_extension: .txt</List.Item>
                                <List.Item>mimetype: text/plain</List.Item>
                                <List.Item>name: mmt</List.Item>
                            </List>
                        </Container>
                    </>
                }
                </LoadWithSpinner>
            </MHTitle>
        );
    }
});
