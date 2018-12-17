import * as React from "react";

import { IModuleProps } from "../../../../theming/Pages/Library/IModuleProps";

export default class Module extends React.Component<IModuleProps> {
    render() {
        const { expanded, item, children } = this.props;

        return (
            <div>
                <p>
                    {item.ref ? "Module" : item.mod.kind === "theory" ? "Theory" : "View"}
                    &nbsp;
                    {item.name}
                    <button onClick={this.toggleExpansion}>{expanded ? "<<" : ">>"}</button>
                </p>
                {expanded && (children !== undefined ?
                        <ul>{children.map(c => <li key={c.props.children.id}>{c}</li>)}</ul> :
                        "Loading ...")
                }
            </div>
        );
    }
    private readonly toggleExpansion = () => this.props.toggleExpansion();
}
