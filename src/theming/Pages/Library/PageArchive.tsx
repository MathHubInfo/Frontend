import * as React from "react";
import { Container, List } from "semantic-ui-react";
import MHHTML from "../../../lib/components/MHHTML";
// import compare from "../../../utils/compare";
import { IArchiveProps } from "./IArchiveProps";

export default class PageArchive extends React.Component<IArchiveProps> {
    render() {
        const documents = this.props.children; // .sort(compare);

        return (
            <Container>
                <h1><MHHTML>{this.props.item.name}</MHHTML></h1>
                {this.props.header}
                <List relaxed>
                    {documents.map(c => <List.Item key={c.props.children.id}>{c}</List.Item>)}
                </List>
            </Container>
        );
    }
}
