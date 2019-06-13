import * as React from "react";
import { Container, List } from "semantic-ui-react";

import MHHTML from "../../../../lib/components/MHHTML";
import { IGroupProps } from "../../../../theming/Pages/Library/IGroupProps";
import compare from "../../../../utils/compare";

export default class Group extends React.Component<IGroupProps> {
    render() {
        const archives = this.props.children.sort(compare);

        return (
            <Container>
                <h1><MHHTML>{this.props.item.name}</MHHTML></h1>
                {this.props.header}
                <List relaxed>
                    {archives.map(c => <List.Item key={c.props.item.id}>{c}</List.Item>)}
                </List>
            </Container>
        );
    }
}
