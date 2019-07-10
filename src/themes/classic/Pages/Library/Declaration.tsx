import * as React from "react";
import intl from "react-intl-universal";
import { Button, Icon, Loader } from "semantic-ui-react";

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
            <>
                {item.ref ?
                    <><Loader active inline size={"mini"} />{intl.get("declaration")}</>
                    : Declaration.names[item.declaration.kind]}
                &nbsp;
                    <Button onClick={this.toggleExpansion} compact size={"tiny"}>
                    <b>{item.name}</b>
                    &emsp;
                        {expanded ? <Icon name="angle double up" fitted />
                        :
                        <Icon name="angle double down" fitted />}
                </Button>
                {expanded && (children !== undefined ?
                    (<ul>
                        {children.map(c => <li key={c.props.children.id}>{c}</li>)}
                    </ul>) :
                    <Loader active inline size={"mini"}>{intl.get("load children")}</Loader>)
                }
                {expanded && (components !== undefined ?
                    <ul>
                        {components.map(c => <li key={c.props.children.name}>{c}</li>)}
                    </ul> :
                    <Loader active inline size={"mini"}>{intl.get("loading components")}</Loader>)
                }
            </>
        );
    }
    private readonly toggleExpansion = () => this.props.toggleExpansion();
}
