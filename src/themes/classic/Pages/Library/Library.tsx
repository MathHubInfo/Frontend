import * as React from "react";

import { ILibraryProps } from "../../../../theming/Pages/Library/ILibraryProps";

export default class Library extends React.Component<ILibraryProps> {
    render() {
        return (
            <>
                {this.props.header}
                <ul>
                    {this.props.children.map(c => <li key={c.props.item.id}>{c}</li>)}
                </ul>
            </>
        );
    }
}
