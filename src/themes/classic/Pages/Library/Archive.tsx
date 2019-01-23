import * as React from "react";
import { Container, List } from "semantic-ui-react";

import { IArchiveProps } from "../../../../theming/Pages/Library/IArchiveProps";

export default class Archive extends React.Component<IArchiveProps> {
    render() {
        return (
            <Container>
                <h1>{this.props.item.name}</h1>
                {this.props.header}
                {this.props.children.map(c => <List key={c.props.children.id}>{c}</List>)}
            </Container>
        );
    }
}
