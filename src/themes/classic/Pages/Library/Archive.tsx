import * as React from "react";

import { IArchiveProps } from "../../../../theming/Pages/Library/IArchiveProps";

export default class Archive extends React.Component<IArchiveProps> {
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
