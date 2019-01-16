import * as React from "react";

import MHLink from "../../../../lib/components/MHLink";
import { IGroupRefProps } from "../../../../theming/Pages/Library/IGroupRefProps";

import MHHTML from "../../../../lib/components/MHHTML";

export default class GroupRef extends React.Component<IGroupRefProps> {
    render() {
        return (
            <div>
                Group <MHLink {...this.props.link}><a>{this.props.item.name}</a></MHLink>
                <MHHTML as="div">{this.props.item.teaser}</MHHTML>
            </div>
        );
    }
}
