import * as React from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import MHHTML from "../../../components/MHHTML";

import { INewsItem } from "../../../context/NewsClient";

type INewsPageProps = INewsItem;

export default class PageNewsPage extends React.Component<INewsPageProps> {
    render() {
        const { date, title, content } = this.props;
        const theDate = new Date(date * 1000);

        return (
            <Container>
                <Header as="h2" attached="top">
                    <MHHTML>{title}</MHHTML>
                    <Header.Subheader>{theDate.toDateString()}</Header.Subheader>
                </Header>
                <Segment attached>
                    <MHHTML>{content}</MHHTML>
                </Segment>
            </Container>
        );
    }
}
