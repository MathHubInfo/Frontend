import * as React from "react";
import { Container, List } from "semantic-ui-react";

import { ILibraryProps } from "../../../../theming/Pages/Library/ILibraryProps";

export default class Library extends React.Component<ILibraryProps> {
    render() {
        return (
            <Container>
                {this.props.header}
                {this.props.children.map(c => <List key={c.props.item.id}>{c}</List>)}
            </Container>
        );
    }
}
