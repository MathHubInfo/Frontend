import * as React from "react";

import { Button, Card, Icon } from "semantic-ui-react";

import {
    IModule,
    IModuleRef } from "../../../../Clients/MMTClient/objects";
import { IMathHubContext, withContext } from "../../../../Context";

import { HTML } from "../../../../Components/Fragments";
import { LoadWithSpinner } from "../../../../Components/Loaders";

export default class Module extends React.Component<{mod: IModuleRef}, {expanded: boolean}> {
    state = {expanded: false};
    render() {
        const {mod} = this.props;

        return (
            <Card>
                <Card.Content>
                    <Button icon size="mini" onClick={this.toggleExpansion} >
                        {this.props.mod.kind} reference
                        {this.state.expanded ? <Icon name="chevron down" /> : <Icon name="chevron right" />}
                    </Button>
                    {this.props.mod.id}
                </Card.Content>
                {this.state.expanded ? <ModuleContentExpanded mod={mod} /> : null}
            </Card>
        );
    }

    private readonly toggleExpansion = () => this.setState({expanded: !this.state.expanded});
}

interface IMEProps {
    mod: IModuleRef;
    context: IMathHubContext;
}

const ModuleContentExpanded = withContext(
    class IME extends React.Component<IMEProps> {
        render() {
            return (
                <LoadWithSpinner
                    title={this.props.mod.name}
                    promise={this.getModule}
                    errorMessage
                >{fullModule => <ModuleViewFullExpanded mod={fullModule} />}
                </LoadWithSpinner>
            );
        }

        private readonly getModule =
            async (): Promise<IModule> => this.props.context.mmtClient.getModule(this.props.mod.id)
    },
);

function ModuleViewFullExpanded(props: {mod: IModule}) {
    return (
        <Card.Content>
            <HTML as="div">{props.mod.presentation}</HTML>
        </Card.Content>
    );
}
