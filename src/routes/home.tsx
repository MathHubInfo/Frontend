import * as React from 'react';

import { Card } from 'semantic-ui-react'

import { WithContext, MathHubContext } from "context"
import { PromiseComponent } from "components/common/loader"
import { Nav } from "components/common/nav"

import { GroupItem } from "context/api/omdoc"

export class Home extends React.Component<{}, {}> {
    render() {
        return <div>
            Something something home

            The list is:
            <AsyncGroupList />
        </div>
    }
}

const AsyncGroupList = WithContext<{}>(class LoadArchiveList extends PromiseComponent<{context: MathHubContext}, GroupItem[]>{
    const loadingTitle = "Group List"

    load() {
        return this.props.context.client.getGroups();
    }

    renderData(groups: GroupItem[]) {
        return <Card.Group itemsPerRow="1">{
            groups.map(group => <GroupListItem key={group.name} group={group} />)
        }</Card.Group>; 
    }
});

/** A single archive item */
class GroupListItem extends React.Component<{group: GroupItem}> {
    render() {
        const {group} = this.props; 
        return <Card>
            <Card.Content>
                <Card.Header as={Nav} to={`/group/${group.name}`}>{group.name}</Card.Header>
                <Card.Description>{group.description}</Card.Description>
            </Card.Content>
        </Card>;
    }
}

