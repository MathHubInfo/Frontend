
import * as React from "react";
import { Button, Card } from "semantic-ui-react";

import { INewsItem } from "../../Clients/NewsClient";
import { Nav } from "../../Components/Common";
import { MHTitle } from "../../Components/Fragments";
import { LoadWithSpinner } from "../../Components/Loaders";
import { withContext } from "../../Context";
import { ILibraryRouteProps } from "../Library/Structure/Links";

class List extends React.Component<ILibraryRouteProps> {
    render() {
        return (
            <MHTitle title={"News"} autoCrumbs>
                <LoadWithSpinner
                    title={"News"}
                    promise={this.getNews}
                    errorMessage
                >{(items: INewsItem[]) => <NewsItemList items={items} />}
                </LoadWithSpinner>
            </MHTitle>
        );
    }

    private readonly getNews = async () => {
        return this.props.context.newsClient.loadAll();
    }
}

// tslint:disable-next-line:export-name
export default withContext(List);

class NewsItemList extends React.Component<{items: INewsItem[]}> {
    render() {
        const { items } = this.props;

        return <Card.Group>{items.map(item => <NewsItemLink key={item.id} item={item} />)}</Card.Group>;
    }
}

function NewsItemLink(props: {item: INewsItem}) {
    const { id, title, date } = props.item;
    const theDate = new Date(0); // The 0 there is the key, which sets the date to the epoch
    theDate.setUTCSeconds(date);

    return (
        <Card>
            <Card.Header >{title}</Card.Header>
            <Card.Meta>{theDate.toDateString()}</Card.Meta>
            <Card.Description>
                <Button as={Nav} to={`/news/${id}`}>Show more</Button>
            </Card.Description>
        </Card>
    );
}
