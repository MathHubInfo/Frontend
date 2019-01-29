import * as React from "react";
import { Container, Divider, List } from "semantic-ui-react";

import { INewsProps } from "../../../../theming/Pages/News/INewsProps";

export default class News extends React.Component<INewsProps> {
    render() {
        return (
            <Container>
                <h1>News</h1>
                <Divider />
                {this.props.children.map(c => <List key={c.props.item.id}>{c}</List>)}
            </Container>
        );
    }
}
