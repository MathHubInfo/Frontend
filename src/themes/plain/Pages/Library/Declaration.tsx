import * as React from "react";

import { IDeclarationProps } from "../../../../theming/Pages/Library/IDeclarationProps";

export default class Declaration extends React.Component<IDeclarationProps> {
    private static readonly names = {
        structure: "Structure",
        rule: "Rule Constant",
        constant: "Constant",
        nested: "Nested",
    };

    render() {
        const { expanded, item, children: [children, components] } = this.props;

        return (
            <div>
                <p>
                    {item.ref ? "Declaration" : Declaration.names[item.declaration.kind]}
                    &nbsp;
                    {item.name}
                    <button onClick={this.toggleExpansion}>{expanded ? "<<" : ">>"}</button>
                </p>
                {expanded && (children !== undefined ?
                        <ul>{children.map(c => <li key={c.props.children.id}>{c}</li>)}</ul> :
                        "Loading Children ...")
                }
                {expanded && (components !== undefined ?
                        <ul>{components.map(c => <li key={c.props.children.name}>{c}</li>)}</ul> :
                        "Loading Components ...")
                }
            </div>
        );
    }
    private readonly toggleExpansion = () => this.props.toggleExpansion();
}
