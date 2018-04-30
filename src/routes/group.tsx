import * as React from "react";

import { Card, Container, Divider, Header } from "semantic-ui-react";

import { LoadWithPromise } from "../components/common/lazy";
import { Nav } from "../components/common/nav";

import { IMathHubContext, WithContext } from "../context";
import {IArchiveItem, IGroup as GroupT} from "../context/api/omdoc";

import DocumentTitle from "react-document-title";

interface IGroupProps {
    match: {
        params: {
            name: string,
        },
    };
}

export const Group = WithContext((context: IMathHubContext) => class extends React.Component<IGroupProps> {
    constructor(props: IGroupProps) {
        super(props);
        this.getGroup = this.getGroup.bind(this);
    }

    private groupName() { return this.props.match.params.name; }
    private getGroup() { return context.client.getGroup(this.groupName()); }

    public render() {
        return (
            <DocumentTitle title={`${this.groupName()} | MathHub`}>
                <LoadWithPromise
                    title={this.groupName()}
                    promise={this.getGroup}
                    errorMessage={true}
                >{
                    (group: GroupT) =>
                        <div>
                            <Container text>
                                <Header as="h2">{group.name}</Header>
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
                </LoadWithPromise>
            </DocumentTitle>
        );
    }
});

class ArchiveItemList extends React.Component<{archives: IArchiveItem[]}> {
    public render() {
        const {archives} = this.props;

        return (
            <Card.Group itemsPerRow="1">
                {archives.map((archive) => <ArchiveListItem key={archive.name} archive={archive} />)}
            </Card.Group>
        );
    }
}

/** A single archive item */
class ArchiveListItem extends React.Component<{archive: IArchiveItem}> {
    public render() {
        const {archive} = this.props;
        return (
            <Card>
                <Card.Content>
                    <Card.Header
                        as={Nav}
                        to={`/content/${archive.group}/${archive.name}`}
                    >
                        {archive.group}/{archive.name}
                    </Card.Header>
                    <Card.Description>{archive.description}</Card.Description>
                </Card.Content>
            </Card>
        );
    }
}
