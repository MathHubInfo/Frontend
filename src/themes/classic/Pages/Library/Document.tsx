import * as React from "react";

import { IDocumentProps } from "../../../../theming/Pages/Library/IDocumentProps";

export default class Document extends React.Component<IDocumentProps> {
    render() {
        return (
            <>
                {this.props.header}
                <ul>
                    {this.props.children.map(c => <li key={c.props.children.id}>{c}</li>)}
                </ul>
            </>
        );
    }
}
