import * as React from "react";
import { Card, Icon } from "semantic-ui-react";
import { INewsItem } from "../../../context/NewsClient";
import MHHTML from "../../../components/MHHTML";
import MHLink, { IMHLinkable } from "../../../components/MHLink";

export interface INewsPageRefProps {
    link: IMHLinkable;
    item: INewsItem;
}

export default class PageNewsPageRef extends React.Component<INewsPageRefProps> {
    render() {
        const theDate = new Date(0); // The 0 there is the key, which sets the date to the epoch
        theDate.setUTCSeconds(this.props.item.date);

        return (
            <MHLink {...this.props.link}>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>
                            <MHHTML>{this.props.item.title}</MHHTML>
                        </Card.Header>
                        <Card.Meta>
                            <Icon name="globe" />
                            {theDate.toDateString()}
                        </Card.Meta>
                        <Card.Description>
                            {this.props.item.teaser && <MHHTML>{this.props.item.teaser}</MHHTML>}
                        </Card.Description>
                    </Card.Content>
                </Card>
            </MHLink>
        );
    }
}
