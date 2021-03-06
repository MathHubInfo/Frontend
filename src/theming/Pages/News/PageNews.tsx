import * as React from "react";
import { Container, Divider, List } from "semantic-ui-react";
import { INewsPageRefProps } from "./PageNewsPageRef";

interface INewsProps {
    /**
     * the description of the page
     */
    description: string;

    /**
     * the list of known news items
     */
    children: Array<React.ReactElement<INewsPageRefProps>>;
}


export default class PageNews extends React.Component<INewsProps> {
    render() {
        return (
            <Container>
                <h1>News</h1>
                <div>{this.props.description}</div>
                <Divider />
                <List relaxed>
                    {this.props.children.map(c => <List.Item key={c.props.item.id}>{c}</List.Item>)}
                </List>
            </Container>
        );
    }
}
