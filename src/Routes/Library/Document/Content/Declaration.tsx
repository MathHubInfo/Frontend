import * as React from "react";
import { Button, Card, Icon, Label } from "semantic-ui-react";

import {
    IComponent,
    IDeclaration,
    IDeclarationRef } from "../../../../Clients/LibraryClient/objects";
import { HTML } from "../../../../Components/Fragments";
import { LoadWithSpinner } from "../../../../Components/Loaders";
import { IMathHubContext, withContext } from "../../../../Context";

export default class Declaration extends React.Component<{declaration: IDeclarationRef}, {expanded: boolean}> {
    state = {expanded: false};
    render() {
        const {declaration, name} = this.props.declaration;

        return (
            <Card>
                <Card.Content>
                    <Button icon size="mini" onClick={this.toggleExpansion} >
                        {DECLARATION_NAMES[declaration]}
                        {this.state.expanded ? <Icon name="chevron down" /> : <Icon name="chevron right" />}
                    </Button>
                    {name}
                </Card.Content>
                {this.state.expanded ? <DeclarationModuleExpanded declaration={this.props.declaration} /> : null}
            </Card>
        );
    }

    private readonly toggleExpansion = () => this.setState({expanded: !this.state.expanded});
}

const DECLARATION_NAMES = {
    constant: "Constant",
    structure: "Structure",
    rule: "Rule",
    nested: "Nested Module",
};

const DeclarationModuleExpanded = withContext(
    class DME extends React.Component<{
        declaration: IDeclarationRef;
        context: IMathHubContext;
    }> {
        render() {
            return (
                <LoadWithSpinner
                    title={this.props.declaration.name}
                    promise={this.getDeclaration}
                    errorMessage
                >{fullDeclaration => <DeclarationViewFullExpanded declaration={fullDeclaration} />}
                </LoadWithSpinner>
            );
        }

        private readonly getDeclaration =
            async (): Promise<IDeclaration> =>
                this.props.context.libraryClient.getDeclaration(this.props.declaration.id)
    },
);

function DeclarationViewFullExpanded(props: {declaration: IDeclaration}) {
    return (
        <Card.Content>
            {props.declaration.components.map(c => <DeclarationComponent key={c.name} component={c} />)}
        </Card.Content>
    );
}

function DeclarationComponent(props: {component: IComponent}) {
    const {name, component} = props.component;

    return (
        <>
            <Label>{name}</Label>
            { component.kind  === "notation" ?
                component.notation : <HTML>{component.object}</HTML>}
            <br />
        </>
    );
}
