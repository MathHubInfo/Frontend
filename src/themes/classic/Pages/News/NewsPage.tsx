import * as React from "react";

import MHHTML from "../../../../lib/components/MHHTML";
import { INewsPageProps } from "../../../../theming/Pages/News/INewsPageProps";

export default class NewsPage extends React.Component<INewsPageProps> {
    render() {
        return <MHHTML>{this.props.content}</MHHTML>;
    }
}
