import * as React from "react";

import { Tab } from "semantic-ui-react";

import { IMathHubContext } from "../../../context";
import { IModule } from "../../../context/api";

import { LibraryItem } from "..";
import { ILibraryRouteProps } from "../structure/links";

import { MathHTML } from "../../../components/common/mathhtml";
import { MonospaceContainer } from "../../../components/common/monospace";

/** a single module */
export class Module extends React.Component<ILibraryRouteProps> {
    constructor(props: ILibraryRouteProps) {
        super(props);
        this.getID = this.getID.bind(this);
        this.getModule = this.getModule.bind(this);
        this.getModuleProps = this.getModuleProps.bind(this);
        this.getModuleBody = this.getModuleBody.bind(this);
    }

    private getID() { return this.props.match.params.id; }
    private getModule(context: IMathHubContext) { return () => context.client.getModule(this.getID()); }
    private getModuleProps(module: IModule) {
        return {
            title: module.name,
            crumbs: module,
            statistics: undefined,
        };
    }
    private getModuleBody(module: IModule) {
        // TODO: Render meta-theory and general information about the object
        // and also show if it is a theory or a view
        return (
            <Tab
                panes={[
                    { menuItem: "View", render: () => <Tab.Pane>
                        <MathHTML>{module.presentation}</MathHTML>
                    </Tab.Pane> },
                    { menuItem: "source", render: () => <Tab.Pane>
                        {module.source ? <MonospaceContainer>{module.source!}</MonospaceContainer> : null}
                    </Tab.Pane>},
                    {
                        menuItem: "graph", render: () =>
                            <Tab.Pane attached={false}>TGView will be added later</Tab.Pane>,
                    },
                ]}
            />
        );
    }

    public render() {
        return (
            <LibraryItem title={this.getID()} promise={this.getModule} props={this.getModuleProps} {...this.props}>{
                this.getModuleBody}</LibraryItem>
        );
    }
}
