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
        const { title, teaser, date } = this.props.item;
        const theDate = new Date(date * 1000);

        const teaserDescription = teaser && (
            <Card.Content>
                <Card.Description>
                    <MHHTML>{teaser}</MHHTML>
                </Card.Description>
            </Card.Content>
        );

        return (
            <MHLink {...this.props.link}>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>
                            <MHHTML>{title}</MHHTML>
                        </Card.Header>
                    </Card.Content>
                    {teaserDescription}
                    <Card.Content extra>
                        <Icon name="globe" />
                        {theDate.toDateString()}
                    </Card.Content>
                </Card>
            </MHLink>
        );
    }
}
