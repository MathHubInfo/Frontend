
import * as React from "react";

import { INewsItem } from "../../Clients/NewsClient";

import { HTML, MHTitle } from "../../Components/Fragments";
import { IRouteComponentProps } from "../../Routing/makeRouteComponent";

export default class Page extends React.Component<IRouteComponentProps<INewsItem, {id: string}>> {
    render() {
        const title = this.props.serverInfo ? this.props.serverInfo.title : this.props.params.id;

        if (this.props.data) return <NewsItemPage title={title} item={this.props.data} />;
        else return <MHTitle title={title} />; // TODO: Make a loading component
    }
}

function NewsItemPage(props: {title: string; item?: INewsItem}) {
    if (props.item === undefined)
        return null; // Doesn't exist

    const { content, date } = props.item;
    const theDate = new Date(0); // The 0 there is the key, which sets the date to the epoch
    theDate.setUTCSeconds(date);

    return (
        <MHTitle title={props.title} autoCrumbs={[{text: "News", url: "/news"}]}>
            <div style={{color: "grey"}}>{theDate.toDateString()}</div>
            <HTML>{content}</HTML>
        </MHTitle>
    );
}
