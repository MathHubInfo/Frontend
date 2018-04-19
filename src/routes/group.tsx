import * as React from "react"

import { Container, Divider, Card, Header } from 'semantic-ui-react'

import { WithContext, MathHubContext } from "context"
import { LoadWithPromise } from "components/common/lazy"
import { Nav } from "components/common/nav"

import {Group as GroupT, ArchiveItem} from "context/api/omdoc"

import DocumentTitle from "react-document-title";

interface GroupProps {
    match: {
        params: {
            name: string
        }
    }
}

export const Group = WithContext((context: MathHubContext) => class extends React.Component<GroupProps> {
    const groupName() { return this.props.match.params.name; }

    render() {
        return <DocumentTitle title={`${this.groupName()} | MathHub`}>
            <LoadWithPromise title={this.groupName()} promise={() => context.client.getGroup(this.groupName())} errorMessage={true}>{
                (group: GroupT) =>
                    <div>
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
            }</LoadWithPromise>
        </DocumentTitle>
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
                <Card.Header as={Nav} to={`/content/${archive.group}/${archive.name}`}>{archive.group}/{archive.name}</Card.Header>
                <Card.Description>{archive.description}</Card.Description>
            </Card.Content>
        </Card>;
    }
}

