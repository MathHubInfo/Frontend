import * as React from "react";
import { Card, Container } from "semantic-ui-react";

import { IGroupRefProps } from "../../../../../src/theming/Pages/Library/IGroupRefProps";
import { ILibraryProps } from "../../../../theming/Pages/Library/ILibraryProps";

export default class Library extends React.Component<ILibraryProps> {
    render() {
        return (
            <Container>
                {this.props.header}
                {this.props.children.map(c => <GroupCard key={c.props.item.id} group={c} />)}
            </Container>
        );
    }
}

class GroupCard extends React.Component<{ group: React.ReactElement<IGroupRefProps> }> {
    render() {
        const { group } = this.props;

        return (
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        {group.props.item.name}
                    </Card.Header>
                    <Card.Description>
                        {group}
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}
