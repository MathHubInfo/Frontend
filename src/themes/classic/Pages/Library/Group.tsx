import * as React from "react";
import { Container, List } from "semantic-ui-react";

import { IGroupProps } from "../../../../theming/Pages/Library/IGroupProps";

export default class Group extends React.Component<IGroupProps> {
    render() {
        return (
            <Container>
                <h1>{this.props.item.name}</h1>
                {this.props.header}
                {this.props.children.map(c => <List key={c.props.item.id}>{c}</List>)}
            </Container>
        );
    }
}
