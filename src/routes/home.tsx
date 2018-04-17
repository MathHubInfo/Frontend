import * as React from 'react';

import { Card } from 'semantic-ui-react'

import { WithContext, MathHubContext } from "context"
import { ArchiveListItem } from "context/api/omdoc"

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

const AsyncArchiveList = WithContext<{}>(class LoadArchiveList extends PromiseComponent<{context: MathHubContext}, ArchiveListItem[]>{
    const loadingTitle = "Archives"

    load() {
        return this.props.context.client.getArchiveList();
    }

    renderData(archives: ArchiveListItem[]) {
        return <ArchiveList archives={archives} />
    }
});

/** A list of archives, where each item links to the appropriate archive */
class ArchiveList extends React.Component<{archives: ArchiveListItem[]}> {
    render() {
        return <Card.Group itemsPerRow="1">{
            this.props.archives.map(archive => <ArchiveItem key={archive.name} archive={archive} />)
        }</Card.Group>; 
    }
}


/** A single archive item */
class ArchiveItem extends React.Component<{archive: ArchiveListItem}> {
    render() {
        const {archive} = this.props; 
        return <Card>
            <Card.Content>
                <Card.Header as={Nav} to={`/archive/${archive.name}`}>{archive.name}</Card.Header>
                <Card.Meta>{archive.namespace}</Card.Meta>
                <Card.Description>{archive.description}</Card.Description>
            </Card.Content>
        </Card>;
    }
}

