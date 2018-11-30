import * as React from "react";
import { default as ReactWaypoint } from "react-waypoint";
import { Card } from "semantic-ui-react";

import {
    IComponent,
    IDeclaration,
    IDeclarationRef } from "../../../../Clients/LibraryClient/objects";
import { HTML } from "../../../../Components/Fragments";
import { IMathHubContext, withContext } from "../../../../Context";

export class Declaration extends React.Component<{ context: IMathHubContext; declaration: IDeclarationRef }> {
    state: {
        declaration?: IDeclaration;
    } = {};

    private isComponentMounted = false;
    private didRunEnter = false;

    componentDidMount() {
        this.isComponentMounted = true;
    }

    componentWillUnmount() {
        this.isComponentMounted = false;
    }

    componentWillReceiveProps() {
        this.didRunEnter = false;
    }

    render() {
        const declaration = this.state.declaration || this.props.declaration;

        return (
            <>
                <ReactWaypoint onEnter={this.onEnter} />
                <ExpandedDeclaration declaration={declaration} />
            </>
        );
    }
    private readonly onEnter = async () => {
        // make sure the function is only run once
        if (this.didRunEnter) return;
        this.didRunEnter = true;

        // load the declaration
        const declaration = await this.getDeclaration();
        if (this.isComponentMounted)
            this.setState({ declaration });
    }

    private async getDeclaration(): Promise<IDeclaration> {
        return this.props.context.libraryClient.getDeclaration(this.props.declaration.id);
    }
}

// tslint:disable-next-line:export-name
export default withContext(Declaration);

const DECLARATION_NAMES = {
    structure: "Structure",
    rule: "Rule Constant",
    constant: "Constant",
    nested: "Nested Module",
};

function ExpandedDeclaration({ declaration }: {declaration: IDeclaration | IDeclarationRef }) {
    const kind = declaration.ref ? declaration.declaration : declaration.declaration.kind;
    const components = declaration.ref ? [] : declaration.components;

    return (
        <Card>
            <Card.Content>
                <Card.Header>{declaration.name}</Card.Header>
                <Card.Description>{DECLARATION_NAMES[kind]}</Card.Description>
            </Card.Content>
            { components.map(c => <DeclarationComponent key={c.name} component={c} />)}
        </Card>
    );
}

function DeclarationComponent(props: {component: IComponent }) {
    const {name, component} = props.component;

    return (
        <Card.Content extra>
                <b>{name}</b>{" "}
                { component.kind  === "notation" ?
                    component.notation : <HTML>{component.object}</HTML>}
        </Card.Content>
    );
}
