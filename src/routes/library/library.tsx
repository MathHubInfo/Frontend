import * as React from "react";

import { Card, Container, Divider } from "semantic-ui-react";

import { LoadWithSpinner } from "../../components/common/lazy";
import { MathHTML } from "../../components/common/mathhtml";
import { Nav } from "../../components/common/nav";

import { MHRefBreadCrumbs } from "../../components/breadcrumbs";

import { IMathHubContext, WithContext } from "../../context";

import { IGroupRef } from "../../context/api";

import { encodeLibraryLink } from "./";

export class Libray extends React.Component<{}, {}> {
    public render() {
        return (
            <>
                <MHRefBreadCrumbs />
                <h1>
                    Library
                </h1>
                <Divider />
                <Container>
                    <AsyncGroupList />
                </Container>
            </>
        );
    }
}

const AsyncGroupList = WithContext((context: IMathHubContext) => class extends React.Component<{}> {
    constructor(props: {}) {
        super(props);
        this.getGroups = this.getGroups.bind(this);
    }

    private getGroups() { return context.client.getGroups(); }

    public render() {
        return (
            <LoadWithSpinner title="Groups" promise={this.getGroups}>{
                (groups: IGroupRef[]) =>
                <Card.Group itemsPerRow="1">{
                    groups.map((group) => <GroupListItem key={group.id} group={group} />)}</Card.Group>
            }</LoadWithSpinner>
        );
    }
});

/** A single group */
class GroupListItem extends React.Component<{group: IGroupRef}> {
    public render() {
        const {group} = this.props;
        return (
            <Card>
                <Card.Content>
                    <Card.Header as={Nav} to={encodeLibraryLink(group)}>
                        <MathHTML>{group.title}</MathHTML>
                    </Card.Header>
                    <Card.Description>
                        <MathHTML reference>{group.teaser}</MathHTML>
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}
