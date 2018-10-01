import * as React from "react";

import { Card, Container, Divider, Dropdown, Grid, Header, Label } from "semantic-ui-react";
import { LoadWithSpinner } from "../../components/common/lazy";
import { MathHTML } from "../../components/common/mathhtml";
import { Nav } from "../../components/common/nav";

import { MHRefBreadCrumbs } from "../../components/breadcrumbs";

import { IMathHubContext, WithContext } from "../../context";
import { IArchiveRef, IGroup } from "../../context/api";

import { MHTitle } from "../../utils/title";

import { decodeLibraryLinkID, encodeLibraryLink, ILibraryRouteProps } from "./";
import { StatisticsTable } from "./narrative/statistics";

export const Group = WithContext((context: IMathHubContext) => class extends React.Component<ILibraryRouteProps> {
    constructor(props: ILibraryRouteProps) {
        super(props);
        this.getGroup = this.getGroup.bind(this);
    }

    private groupName() { return decodeLibraryLinkID(this.props.match.params.id); }
    private getGroup() { return context.client.getGroup(this.groupName()); }

    public render() {
        return (
            <MHTitle title={this.groupName()}>
                <LoadWithSpinner
                    title={this.groupName()}
                    promise={this.getGroup}
                    errorMessage={true}
                >{
                    (group: IGroup) =>
                        <>
                            <MHRefBreadCrumbs to={group} />
                            <>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={11}>
                                            <Header as="h2">
                                                <MathHTML>{group.title}</MathHTML>
                                            </Header>
                                        </Grid.Column>
                                        <Grid.Column width={5}>
                                            <Container textAlign={"right"}>
                                                <Dropdown text={"statistics"} button icon={null} pointing={"right"}>
                                                    <Dropdown.Menu>
                                                        <StatisticsTable statistics={group.statistics} />
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </Container>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                                <MathHTML renderReferences>{group.description}</MathHTML>
                                <>
                                    <b>Responsible:</b> {group.responsible.map((p) => <Label key={p}>{p}</Label>)}
                                </>
                            </>
                            <Divider />
                            <Container>
                                <ArchiveItemList archives={group.archives} />
                            </Container>
                        </>
                }
                </LoadWithSpinner>
            </MHTitle>
        );
    }
});

class ArchiveItemList extends React.Component<{archives: IArchiveRef[]}> {
    public render() {
        const {archives} = this.props;

        return (
            <Card.Group itemsPerRow="1">
                {archives.map((archive) => <ArchiveListItem key={archive.id} archive={archive} />)}
            </Card.Group>
        );
    }
}

/** A single archive item */
class ArchiveListItem extends React.Component<{archive: IArchiveRef}> {
    public render() {
        const {archive} = this.props;
        return (
            <Card>
                <Card.Content>
                    <Card.Header as={Nav} to={encodeLibraryLink(archive)} >
                        <MathHTML>{archive.title}</MathHTML>
                    </Card.Header>
                    <Card.Description>{archive.teaser}</Card.Description>
                </Card.Content>
            </Card>
        );
    }
}
