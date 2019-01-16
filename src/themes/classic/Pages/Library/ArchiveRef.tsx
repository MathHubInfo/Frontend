import * as React from "react";

import MHLink from "../../../../lib/components/MHLink";
import { IArchiveRefProps } from "../../../../theming/Pages/Library/IArchiveRefProps";

import MHHTML from "../../../../lib/components/MHHTML";

export default class ArchiveRef extends React.Component<IArchiveRefProps> {
    render() {
        return (
            <div>
                Archive <MHLink {...this.props.link}><a>{this.props.item.name}</a></MHLink>
                <MHHTML as="div">{this.props.item.teaser}</MHHTML>
            </div>
        );
    }
}
