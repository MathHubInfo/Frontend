import * as React from 'react';

import { Card } from 'semantic-ui-react'

import { WithContext, MathHubContext } from "context"
import { GroupItem } from "context/api/omdoc"

import { PromiseComponent } from "components/common/loader"
import { Nav } from "components/common/nav"

export class Home extends React.Component<{}, {}> {
    render() {
        return <div>
            Something something home

            The list is:
            <AsyncArchiveList />
        </div>
    }
}

const AsyncArchiveList = WithContext<{}>(class LoadArchiveList extends PromiseComponent<{context: MathHubContext}, GroupItem[]>{
    const loadingTitle = "Groups"

    load() {
        return this.props.context.client.getGroups();
    }

    renderData(groups: GroupItem[]) {
        return <GroupList groups={groups} />
    }
});

/** A list of groups, where each item links to the appropriate group */
class GroupList extends React.Component<{groups: GroupItem[]}> {
    render() {
        return <Card.Group itemsPerRow="1">{
            this.props.groups.map(group => <GroupListItem key={group.name} group={group} />)
        }</Card.Group>; 
    }
}


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

