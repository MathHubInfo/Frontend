import * as React from "react";

import { Button, Container, Header, Image, Table } from "semantic-ui-react";

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
                                <div dangerouslySetInnerHTML={{ __html: notebook.name }} />
                                <Button floated={"right"} size={"small"}>RUN</Button>
                                <Image
                                    src={require("../../../assets/logos/jupyter_logo.png")}
                                    size={"small"}
                                    inline
                                    floated={"right"}
                                />
                            </Header>
                            <Screenshot />
                        </Container>
                    </>
                    }
                </LoadWithSpinner>
            </MHTitle>
        );
    }
});

class Screenshot extends React.Component<{}> {
    public render() {
        return (
            <>
                <Table basic={"very"}>
                    <Table.Body>
                        <Table.Row >
                            <Table.Cell width={4}>author:</Table.Cell>
                            <Table.Cell>Kai Amann</Table.Cell>
                            <Table.Cell width={7}/>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell width={4}>date:</Table.Cell>
                            <Table.Cell>05.07.2018</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell width={4}>title:</Table.Cell>
                            <Table.Cell>MMTDemo</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                <Table basic={"very"}>
                    <Table.Header >
                        <Table.Row>
                            <Table.HeaderCell width={4}>kernelspec</Table.HeaderCell>
                            <Table.HeaderCell />
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>display_name:</Table.Cell>
                            <Table.Cell>MMTDemo</Table.Cell>
                            <Table.Cell width={7}/>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>language:</Table.Cell>
                            <Table.Cell>MMT</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>name:</Table.Cell>
                            <Table.Cell>mmtdemo</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                <Table basic={"very"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={4}>language_info</Table.HeaderCell>
                            <Table.HeaderCell />
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>file_extension:</Table.Cell>
                            <Table.Cell>.mmt</Table.Cell>
                            <Table.Cell width={7}/>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>mimetype:</Table.Cell>
                            <Table.Cell>text/plain</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>name:</Table.Cell>
                            <Table.Cell>mmt</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </>
        );
    }
}
