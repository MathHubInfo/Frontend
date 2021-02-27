import * as React from "react";
import { Container } from "semantic-ui-react";
import MHHTML from "../../../components/MHHTML";

import { INewsItem } from "../../../context/NewsClient";

// tslint:disable-next-line: no-empty-interface
type INewsPageProps = INewsItem;

export default class PageNewsPage extends React.Component<INewsPageProps> {
    render() {
        const theDate = new Date(0); // The 0 there is the key, which sets the date to the epoch
        theDate.setUTCSeconds(this.props.date);

        return (
            <Container>
                <h2>
                    <MHHTML>{this.props.title}</MHHTML>
                </h2>
                <div style={{ color: "grey" }}>{theDate.toDateString()}</div>
                <MHHTML>{this.props.content}</MHHTML>
            </Container>
        );
    }
}
