import * as React from "react";
import { Container, List } from "semantic-ui-react";

import MHHTML from "../../../../lib/components/MHHTML";
import { IGroupProps } from "../../../../theming/Pages/Library/IGroupProps";

export default class Group extends React.Component<IGroupProps> {
    render() {
        return (
            <Container>
                <h1><MHHTML>{this.props.item.name}</MHHTML></h1>
                {this.props.header}
                {this.props.children.map(c => <List key={c.props.item.id}>{c}</List>)}
            </Container>
        );
    }
}
