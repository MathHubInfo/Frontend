import * as React from "react";

import { Tab } from "semantic-ui-react";
import { decodeLibraryLinkID } from "../";
import { LoadWithSpinner } from "../../../components/common/lazy";
import { MathHTML } from "../../../components/common/mathhtml";
import { IMathHubContext } from "../../../context";
import { IModuleCommon, INarrativeElement } from "../../../context/api";

/** returns the html-presentation of every theory and view */
export class ModuleView extends React.Component<{decls: INarrativeElement[], context: IMathHubContext}> {
    public render() {
        const {decls} = this.props;
        const {context} = this.props;
        return(
            <Tab.Pane attached={false}>
                {decls
                        .filter((m) => m.kind === "theory" || m.kind === "view")
                        .map((module) => <ModuleViewElement key={module.id} narrative={module} context={context}/>)
                }
            </Tab.Pane>
        );
    }
}

class ModuleViewElement extends React.Component<{narrative: INarrativeElement, context: IMathHubContext}> {

    private ModuleID() {
        const {narrative} = this.props;
        return decodeLibraryLinkID(narrative.id);
    }
    private getModule() {
        const {context} = this.props;
        return context.client.getModule(this.ModuleID());
    }

    public render() {
        this.getModule = this.getModule.bind(this);
        return(
            <LoadWithSpinner
                    title={this.ModuleID()}
                    promise={this.getModule}
                    errorMessage={true}
            >{(module: IModuleCommon) =>
                <MathHTML renderReferences>{module.presentation}</MathHTML>
            }
            </LoadWithSpinner>
        );
    }
}

/** returns the source of every theory and view if available */
export class ModuleSource extends React.Component<{decls: INarrativeElement[], context: IMathHubContext}> {
    public render() {
        const {decls} = this.props;
        const {context} = this.props;
        return(
            <Tab.Pane attached={false}>
                {decls
                        .filter((m) => m.kind === "theory" || m.kind === "view")
                        .map((module) => <ModuleSourceElement key={module.id} narrative={module} context={context}/>)
                }
            </Tab.Pane>
        );
    }
}

class ModuleSourceElement extends React.Component<{narrative: INarrativeElement, context: IMathHubContext}> {

    private ModuleID() {
        const {narrative} = this.props;
        return decodeLibraryLinkID(narrative.id);
    }
    private getModule() {
        const {context} = this.props;
        return context.client.getModule(this.ModuleID());
    }

    public render() {
        this.getModule = this.getModule.bind(this);
        return(
            <LoadWithSpinner
                    title={this.ModuleID()}
                    promise={this.getModule}
                    errorMessage={true}
            >{(module: IModuleCommon) =>
                <>{module.source}</>
            }
            </LoadWithSpinner>
        );
    }
}
