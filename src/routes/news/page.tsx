
import * as React from "react";

import { withContext } from "../../context";
import { ILibraryRouteProps } from "../library/structure/links";

import NewsClient, { INewsItem } from "../../clients/news";

import { MHTitle } from "../../components/fragments";
import { LoadWithSpinner } from "../../components/loaders";

class NewsPage extends React.Component<ILibraryRouteProps> {
    /** the client to receive data from */
    private client: NewsClient;

    constructor(props: ILibraryRouteProps) {
        super(props);
        this.client = new NewsClient(props.context.config.client.NEWS_URL);
        this.getNews = this.getNews.bind(this);
    }

    private getNews() {
        return this.client.load(this.props.match.params.id);
    }

    public render() {
        return (
            <LoadWithSpinner
                title={"News"}
                promise={this.getNews}
                errorMessage={true}
            >{(item: INewsItem | undefined) => <NewsItemPage item={item} />}
            </LoadWithSpinner>
        );
    }
}

export default withContext(NewsPage);

function NewsItemPage(props: {item?: INewsItem}) {
    if (typeof props.item === "undefined") {
        return null; // Doesn't exist
    }
    const { title, content } = props.item;
    return (
        <MHTitle title={title} autoCrumbs={[{text: "News", url: "/news"}]}>
            <div dangerouslySetInnerHTML={{__html: content}} />
        </MHTitle>
    );
}
