import * as React from "react";

import { Button, Card, Icon } from "semantic-ui-react";
import {
    IModule,
    IModuleRef } from "../../../../api";
import { LoadWithSpinner } from "../../../../components/common/lazy";
import { MathHTML } from "../../../../components/common/mathhtml";
import { IMathHubContext, withContext } from "../../../../context";

export default class ModuleContentInline extends React.Component<{module: IModuleRef}, {expanded: boolean}> {
    constructor(props: {module: IModuleRef}) {
        super(props);
        this.state = {expanded: false};
        this.toggleExpansion = this.toggleExpansion.bind(this);
    }

    private toggleExpansion() {
        this.setState({expanded: !this.state.expanded});
    }

    public render() {
        const {module} = this.props;

        // TODO: Allow this to be expandable
        return (
            <Card>
                <Card.Content>
                    <Button icon size="mini" onClick={this.toggleExpansion} >
                        {this.props.module.kind} reference
                        {this.state.expanded ? <Icon name="chevron down" /> : <Icon name="chevron right" />}
                    </Button>
                    {this.props.module.id}
                </Card.Content>
                {this.state.expanded ? <ModuleContentExpanded module={module} /> : null}
            </Card>
        );
    }
}

interface IMEProps {
    module: IModuleRef;
    context: IMathHubContext;
}

const ModuleContentExpanded = withContext<{module: IModuleRef}>(
    class IME extends React.Component<IMEProps> {
        constructor(props: IMEProps) {
            super(props);
            this.getModule = this.getModule.bind(this);
        }

        private getModule(): Promise<IModule> {
            return this.props.context.client.getModule(this.props.module.id);
        }

        // TODO: Render the presentation properly
        public render() {
            return (
                <LoadWithSpinner
                    title={this.props.module.name}
                    promise={this.getModule}
                    errorMessage={true}
                >{(fullModule) => <ModuleViewFullExpanded module={fullModule} />}
                </LoadWithSpinner>
            );
        }
    },
);

function ModuleViewFullExpanded(props: {module: IModule}) {
    return (
        <Card.Content>
            <MathHTML as="div">{props.module.presentation}</MathHTML>
        </Card.Content>
    );
}
