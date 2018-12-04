
import * as React from "react";

import { withContext } from "../../Context";
import { ILibraryRouteProps } from "../Library/Structure/Links";

import { INewsItem } from "../../Clients/NewsClient";

import { HTML, MHTitle } from "../../Components/Fragments";
import { LoadWithSpinner } from "../../Components/Loaders";

class Page extends React.Component<ILibraryRouteProps> {
    render() {
        return (
            <LoadWithSpinner
                title={"News"}
                promise={this.getNews}
                errorMessage
            >{(item: INewsItem | undefined) => <NewsItemPage item={item} />}
            </LoadWithSpinner>
        );
    }

    private readonly getNews = async () => {
        return this.props.context.newsClient.load(this.props.match.params.id);
    }
}

// tslint:disable-next-line:export-name
export default withContext(Page);

function NewsItemPage(props: {item?: INewsItem}) {
    if (props.item === undefined)
        return null; // Doesn't exist

    const { title, content, date } = props.item;
    const theDate = new Date(0); // The 0 there is the key, which sets the date to the epoch
    theDate.setUTCSeconds(date);

    return (
        <MHTitle title={title} autoCrumbs={[{text: "News", url: "/news"}]}>
            <div style={{color: "grey"}}>{theDate.toDateString()}</div>
            <HTML>{content}</HTML>
        </MHTitle>
    );
}
