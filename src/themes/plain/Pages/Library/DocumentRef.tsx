import * as React from "react";

import MHLink from "../../../../lib/components/MHLink";

import { IDocumentRefProps } from "../../../../theming/Pages/Library/IDocumentRefProps";

export default class DocumentRef extends React.Component<IDocumentRefProps> {
    render() {
        return (
            <div>
                Document <MHLink {...this.props.link}><a>{this.props.item.name}</a></MHLink>
            </div>
        );
    }
}
