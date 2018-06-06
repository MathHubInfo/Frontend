import * as React from "react";

import { Card, Container, Divider } from "semantic-ui-react";

import { LoadWithPromise } from "../../components/common/lazy";
import { Nav } from "../../components/common/nav";

import { MHRefBreadCrumbs } from "../../components/breadcrumbs";

import { IMathHubContext, WithContext } from "../../context";

import { IGroupRef } from "../../context/api";

export class Libray extends React.Component<{}, {}> {
    public render() {
        return (
            <div>
                <MHRefBreadCrumbs />
                <h1>
                    Library
                </h1>
                <Divider />
                <Container>
                    <AsyncGroupList />
                </Container>
            </div>
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
            <LoadWithPromise title="Groups" promise={this.getGroups}>{
                (groups: IGroupRef[]) =>
                <Card.Group itemsPerRow="1">{
                    groups.map((group) => <GroupListItem key={group.id} group={group} />)}</Card.Group>
            }</LoadWithPromise>
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
                    <Card.Header as={Nav} to={`/content/${group.id}`}>
                        <div dangerouslySetInnerHTML={{__html: group.title}} />
                    </Card.Header>
                    <Card.Description>
                        <div dangerouslySetInnerHTML={{__html: group.teaser}} />
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}
