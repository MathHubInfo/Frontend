import * as React from "react"

import { Container, Divider, Card, Header } from 'semantic-ui-react'

import { WithContext, MathHubContext } from "context"
import { PromiseComponent } from "components/common/loader"
import { Nav } from "components/common/nav"

import {Group as GroupT, ArchiveItem} from "context/api/omdoc"

interface GroupProps {
    match: {
        params: {
            name: string
        }
    }
}
export const Group = WithContext<GroupProps>(class extends PromiseComponent<{context: MathHubContext} & GroupProps, GroupT>{
    const groupName() { return this.props.match.params.name; }

    const loadingTitle = `Group ${this.groupName()}`
    const errorTitle = this.loadingTitle;

    load() {
        return this.props.context.client.getGroup(this.groupName());
    }

    renderData(group: GroupT) {
        return <div>
            <Container text>
                <Header as='h2'>{group.name}</Header>
                <div>
                    {group.longDescription}
                </div>
                <div>
                    <b>Responsible:</b> {group.maintainer}
                </div>
            </Container>
            <Divider />
            <Container>
                <ArchiveItemList archives={group.archives} />
            </Container>
        </div>
    }
});

class ArchiveItemList extends React.Component<{archives: ArchiveItem[]}> {
    render() {
        const {archives} = this.props;
        
        return <Card.Group itemsPerRow="1">{
            archives.map(archive => <ArchiveListItem key={archive.name} archive={archive} />)
        }</Card.Group>;
    }
}

/** A single archive item */
class ArchiveListItem extends React.Component<{archive: ArchiveItem}> {
    render() {
        const {archive} = this.props; 
        return <Card>
            <Card.Content>
                <Card.Header as={Nav} to={`/archive/${archive.group}/${archive.name}`}>{archive.group}/{archive.name}</Card.Header>
                <Card.Description>{archive.description}</Card.Description>
            </Card.Content>
        </Card>;
    }
}

