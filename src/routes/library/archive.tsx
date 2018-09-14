import * as React from "react";

import { Container, Divider, Dropdown, Grid, Header, Label } from "semantic-ui-react";
import { LoadWithSpinner } from "../../components/common/lazy";
import { MathHTML } from "../../components/common/mathhtml";

import { IMathHubContext, WithContext } from "../../context";
import { IArchive } from "../../context/api";

import { MHRefBreadCrumbs } from "../../components/breadcrumbs";

import { MHTitle } from "../../utils/title";

import { decodeLibraryLinkID, ILibraryRouteProps } from "./";
import { DocumentItemList } from "./narrative/documentItemList";
import { StatisticsTable } from "./narrative/statistics";

export const Archive = WithContext((context: IMathHubContext) => class extends React.Component<ILibraryRouteProps> {
    constructor(props: ILibraryRouteProps) {
        super(props);
        this.getArchive = this.getArchive.bind(this);
    }

    private archiveID() { return decodeLibraryLinkID(this.props.match.params.id); }
    private getArchive() { return context.client.getArchive(this.archiveID()); }

    public render() {
        return (
            <MHTitle title={this.archiveID()}>
                <LoadWithSpinner
                    title={this.archiveID()}
                    promise={this.getArchive}
                    errorMessage={true}
                >{(archive: IArchive) =>
                    <>
                        <>
                            <MHRefBreadCrumbs to={archive} />
                            <>
                            <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={11}>
                                            <Header as="h2">
                                                <MathHTML content={archive.title} />
                                            </Header>
                                        </Grid.Column>
                                        <Grid.Column width={5}>
                                            <Container textAlign={"right"}>
                                                <Dropdown text={"statistics"} button icon={null} pointing={"right"}>
                                                    <Dropdown.Menu>
                                                        <StatisticsTable statistics={archive.statistics} />
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Container>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                                <MathHTML content={archive.description} />
                                <>
                                    <b>Responsible:</b> {archive.responsible.map((p) => <Label key={p}>{p}</Label>)}
                                </>
                            </>
                            <Divider />
                            <Container>{
                                <DocumentItemList nRoot={archive.narrativeRoot.decls} />}
                            </Container>
                        </>
                    </>
                }
                </LoadWithSpinner>
            </MHTitle>
        );
    }
});
