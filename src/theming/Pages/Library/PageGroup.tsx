import * as React from "react";
import { Container, List } from "semantic-ui-react";
import MHHTML from "../../../lib/components/MHHTML";
import Compare from "../../../utils/Compare";
import { IGroupProps } from "./IGroupProps";

export default class PageGroup extends React.Component<IGroupProps> {
    render() {
        const archives = this.props.children.sort(Compare);

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
