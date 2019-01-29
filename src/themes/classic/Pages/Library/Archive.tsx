import * as React from "react";
import { Container, List } from "semantic-ui-react";

import MHHTML from "../../../../lib/components/MHHTML";
import { IArchiveProps } from "../../../../theming/Pages/Library/IArchiveProps";

export default class Archive extends React.Component<IArchiveProps> {
    render() {
        return (
            <Container>
                <h1><MHHTML>{this.props.item.name}</MHHTML></h1>
                {this.props.header}
                {this.props.children.map(c => <List key={c.props.children.id}>{c}</List>)}
            </Container>
        );
    }
}
