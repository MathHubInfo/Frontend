import * as React from "react";

import { IGroupProps } from "../../../../theming/Pages/Library/IGroupProps";

export default class Group extends React.Component<IGroupProps> {
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
