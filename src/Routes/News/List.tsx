
import * as React from "react";
import { Card, Icon } from "semantic-ui-react";

import { INewsItem } from "../../Clients/NewsClient";
import { Nav } from "../../Components/Common";
import { HTML, MHTitle } from "../../Components/Fragments";
import { IRouteComponentProps } from "../../Routing/makeRouteComponent";

export default class List extends React.Component<IRouteComponentProps<INewsItem[]>> {
    render() {
        return (
            <MHTitle title={"News"} autoCrumbs>
                <>{this.props.data && <NewsItemList items={this.props.data} />}</>
            </MHTitle>
        );
    }
}

class NewsItemList extends React.Component<{ items: INewsItem[] }> {
    render() {
        const { items } = this.props;

        return (
        <Card.Group itemsPerRow={1}>
            {items.map(item => <NewsItemLink key={item.id} item={item} />)}
        </Card.Group>
        );
    }
}

function NewsItemLink(props: { item: INewsItem }) {
    const { id, title, date } = props.item;
    const theDate = new Date(0); // The 0 there is the key, which sets the date to the epoch
    theDate.setUTCSeconds(date);

    return (
        <Card as={Nav} to={`/news/${id}`}>
            <Card.Content>
                <HTML as={Card.Header}>{title}</HTML>
                <Card.Meta>
                    <Icon name="globe" />
                    {theDate.toDateString()}
                </Card.Meta>
            </Card.Content>
        </Card>
    );
}
