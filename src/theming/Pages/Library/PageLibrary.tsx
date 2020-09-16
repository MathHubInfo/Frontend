import * as React from "react";
import intl from "react-intl-universal";
import { Container, List } from "semantic-ui-react";
import Compare from "../../../utils/Compare";
import { ILibraryProps } from "./ILibraryProps";

export default class PageLibrary extends React.Component<ILibraryProps> {
    render() {
        const group = this.props.children.sort(Compare);

        return (
            <Container>
                <h1>{intl.get("library")}</h1>
                {this.props.header}
                <List relaxed>
                    {group.map(c => <List.Item key={c.props.item.id}>{c}</List.Item>)}
                </List>
            </Container>
        );
    }
}
