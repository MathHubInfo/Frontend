import * as React from "react";

import MHLink from "../../../../lib/components/MHLink";
import { INewsPageRefProps } from "../../../../theming/Pages/News/INewsPageRefProps";

export default class NewsPageRef extends React.Component<INewsPageRefProps> {
    render() {
        return (
            <MHLink {...this.props.link} >
                <a>{this.props.item.title}</a>
            </MHLink>
        );
    }
}
