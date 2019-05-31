import * as React from "react";
import intl from "react-intl-universal";
import { Container, List } from "semantic-ui-react";

import { ILibraryProps } from "../../../../theming/Pages/Library/ILibraryProps";

export default class Library extends React.Component<ILibraryProps> {
    render() {
        return (
            <Container>
                <h1>{intl.get("library")}</h1>
                {this.props.header}
                <List relaxed>
                    {this.props.children.map(c => <List.Item key={c.props.item.id}>{c}</List.Item>)}
                </List>
            </Container>
        );
    }
}
