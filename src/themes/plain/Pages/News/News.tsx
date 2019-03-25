import * as React from "react";

import { INewsProps } from "../../../../theming/Pages/News/INewsProps";

export default class News extends React.Component<INewsProps> {
    render() {
        return <ul>{this.props.children.map(c => <li key={c.props.item.id}>{c}</li>)}</ul>;
    }
}
