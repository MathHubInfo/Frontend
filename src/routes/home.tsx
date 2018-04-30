import * as React from 'react';

import { Container, Divider, Card } from 'semantic-ui-react'

import { WithContext, MathHubContext } from "../context"
import { LoadWithPromise } from "../components/common/lazy"
import { Nav } from "../components/common/nav"

import { GroupItem } from "../context/api/omdoc"

export class Home extends React.Component<{}, {}> {
    render() {
        return <div>
            <Container text>
                Something something home
            </Container>
            <Divider />
            <Container>
                <AsyncGroupList />
            </Container>
        </div>
    }
}

const AsyncGroupList = WithContext((context: MathHubContext) => class extends React.Component<{}>{

    render() {
        return <LoadWithPromise title='Groups' promise={ () => context.client.getGroups() }>{
            (groups: GroupItem[]) =>
            <Card.Group itemsPerRow="1">{
                groups.map(group => <GroupListItem key={group.name} group={group} />)
            }</Card.Group>
        }</LoadWithPromise>
    }
});

/** A single archive item */
class GroupListItem extends React.Component<{group: GroupItem}> {
    render() {
        const {group} = this.props; 
        return <Card>
            <Card.Content>
                <Card.Header as={Nav} to={`/content/${group.name}`}>{group.name}</Card.Header>
                <Card.Description>{group.description}</Card.Description>
            </Card.Content>
        </Card>;
    }
}

