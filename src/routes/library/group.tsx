import * as React from "react";

import { Card, Container, Divider, Header, Label } from "semantic-ui-react";
import { LoadWithPromise } from "../../components/common/lazy";
import { Nav } from "../../components/common/nav";

import { MHRefBreadCrumbs } from "../../components/breadcrumbs";

import { IMathHubContext, WithContext } from "../../context";
import { IArchiveRef, IGroup } from "../../context/api";

import { MHTitle } from "../../utils/title";

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
            <MHTitle title={this.groupName()}>
                <LoadWithPromise
                    title={this.groupName()}
                    promise={this.getGroup}
                    errorMessage={true}
                >{
                    (group: IGroup) =>
                        <>
                            <MHRefBreadCrumbs to={group} />
                            <>
                                <Header as="h2">
                                    <div dangerouslySetInnerHTML={{__html: group.title}} />
                                </Header>
                                <div dangerouslySetInnerHTML={{__html: group.description}} />
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
                </LoadWithPromise>
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
                    <Card.Header
                        as={Nav}
                        to={`/content/${archive.id}`}
                    >
                        <div dangerouslySetInnerHTML={{__html: archive.title}} />
                    </Card.Header>
                    <Card.Description>{archive.teaser}</Card.Description>
                </Card.Content>
            </Card>
        );
    }
}
