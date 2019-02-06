import * as React from "react";
import { Button, Icon, List, Loader } from "semantic-ui-react";

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
                    {item.ref ?
                        <><Loader active inline size={"mini"} />Declaration</>
                        : Declaration.names[item.declaration.kind]}
                    &nbsp;
                    <b>{item.name}</b>
                    <Button onClick={this.toggleExpansion} icon compact size={"mini"}>
                        {expanded ? <Icon name="angle double up" /> : <Icon name="angle double down" />}
                    </Button>
                </p>
                {expanded && (children !== undefined ?
                    <List bulleted>
                        {children.map(c => <List.Item key={c.props.children.id}>{c}</List.Item>)}
                    </List> :
                    <Loader active inline size={"mini"}>Loading Children</Loader>)
                }
                {expanded && (components !== undefined ?
                    <List bulleted>
                        {components.map(c => <List.Item key={c.props.children.name}>{c}</List.Item>)}
                    </List> :
                    <Loader active inline size={"mini"}>Loading Components</Loader>)
                }
            </div>
        );
    }
    private readonly toggleExpansion = () => this.props.toggleExpansion();
}
