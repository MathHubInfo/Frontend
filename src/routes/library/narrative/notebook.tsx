import * as React from "react";

import { IMathHubContext } from "../../../context";
import { INotebook } from "../../../context/api";

import { LibraryItem } from "..";
import { ILibraryRouteProps } from "../structure/links";

/** a single notebook */
export class Notebook extends React.Component<ILibraryRouteProps> {
    constructor(props: ILibraryRouteProps) {
        super(props);
        this.getID = this.getID.bind(this);
        this.getNotebook = this.getNotebook.bind(this);
        this.getNotebookProps = this.getNotebookProps.bind(this);
        this.getNotebookBody = this.getNotebookBody.bind(this);
    }

    private getID() { return this.props.match.params.id; }
    private getNotebook(context: IMathHubContext) { return () => context.client.getNotebook(this.getID()); }
    private getNotebookProps(notebook: INotebook) {
        return {
            title: notebook.name,
            crumbs: notebook,
            statistics: notebook.statistics,
        };
    }
    private getNotebookBody(module: INotebook) {
        // TODO: I am not sure if even the notebook abstraction is right
        // and we need to rethink this entire route
        // hence leaving it empty for now
        return <></>;
    }

    public render() {
        return (
            <LibraryItem title={this.getID()} promise={this.getNotebook} props={this.getNotebookProps} {...this.props}>{
                this.getNotebookBody}</LibraryItem>
        );
    }
}
/*
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
                                <Grid>
                                    <Grid.Column width={6}>
                                        <MathHTML>{notebook.name}</MathHTML>
                                    </Grid.Column>
                                    <Grid.Column width={10}>
                                        <Button floated={"right"}>
                                            source
                                        </Button>
                                        <Button floated={"right"}>run/edit</Button>
                                        <Image

                                                src={require("../../../../assets/logos/jupyter_logo.png")}
                                                size={"mini"}
                                                floated={"right"}
                                        />
                                    </Grid.Column>
                                </Grid>
                            </Header>
                            <Tab
                                panes={[
                                    {
                                        menuItem: "preview", render: () =>
                                            <Tab.Pane />,
                                    },
                                    {
                                        menuItem: "metadata", render: () =>
                                            <Tab.Pane>
                                                <Screenshot />
                                            </Tab.Pane>,
                                    },
                                    {
                                        menuItem: "statistics", render: () =>
                                            <Tab.Pane>
                                                <StatisticsTable statistics={notebook.statistics} />
                                            </Tab.Pane>,
                                    },
                                    {
                                        menuItem: "graph", render: () =>
                                            <Tab.Pane attached={false}>TGView will be added later</Tab.Pane>,
                                    },
                                ]}
                            />
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
                            <Table.Cell width={7} />
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
                            <Table.Cell width={7} />
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
                            <Table.Cell width={7} />
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
*/
