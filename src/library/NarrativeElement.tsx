import * as React from "react";

import { Waypoint as ReactWaypoint } from "react-waypoint";

import PageComponent, { IComponentProps } from "../theming/Pages/Library/PageComponent";

import PageRef from "../theming/Pages/Library/PageRef";
import PageModule from "../theming/Pages/Library/PageModule";
import PageOpaque from "../theming/Pages/Library/PageOpaque";

import PageDeclaration from "../theming/Pages/Library/PageDeclaration";
import {
    IDeclaration,
    IDeclarationRef,
    IModule,
    IModuleRef,
    INarrativeElement,
} from "../context/LibraryClient/objects";

export interface INarrativeElementProps extends IExpansionProps {
    children: INarrativeElement;
}
interface IModuleElementProps extends IExpansionProps {
    children: IModuleRef;
}

interface IDeclarationElementProps extends IExpansionProps {
    children: IDeclarationRef | IDeclaration;
}

export interface IExpansionProps {
    // tells the parent to start pre-loading an element
    preloadModule(id: string, urgent: boolean): void;

    // tells the parent to start pre-loading a declaration
    preloadDeclaration(id: string, urgen: boolean): void;

    // function to check if an element should be expanded
    isModuleExpanded(id: string): boolean;

    // function to check if a declaration should be expanded
    isDeclarationExpanded(id: string): boolean;

    // function to toggle the expansion of a given element
    toggleModuleExpansion(id: string): void;

    // function to toggle expansion of a given declaration
    toggleDeclarationExpansion(id: string): void;

    // function to retrieve data of a specific module
    getModule(id: string): IModule | undefined;

    // function to retrieve data of a specific declaration
    getDeclaration(id: string): IDeclaration | undefined;
}

export default class NarrativeElement extends React.Component<INarrativeElementProps> {
    render() {
        const { children } = this.props;

        switch (children.kind) {
            case "document":
                return <PageRef item={children} link={{ href: children }} />;
            case "opaque":
                return <PageOpaque>{children}</PageOpaque>;
            case "module":
                return <ModuleElement {...this.props}>{children}</ModuleElement>;
            case "declaration":
                return <DeclarationElement {...this.props}>{children}</DeclarationElement>;
            default:
                return null; // Unsupported element
        }
    }
}

class ModuleElement extends React.Component<IModuleElementProps> {
    state = { item: this.props.children, expanded: false };

    render() {
        const { children, ...rest } = this.props;

        // the current child
        const theItem = this.props.getModule(children.id) || children;

        // check if this element is currently expanded
        const expanded = this.props.isModuleExpanded(children.id);

        // if we are expanded and have information on the children
        // we want to load them
        let modChildren: Array<React.ReactElement<INarrativeElementProps>> = [];
        if (expanded && !theItem.ref && theItem.declarations)
            modChildren = theItem.declarations.map(d => (
                <NarrativeElement key={d.id} {...rest}>
                    {d}
                </NarrativeElement>
            ));

        // and render the actual module
        // with the children (if any)
        return (
            <>
                <ReactWaypoint onEnter={this.onEnter} />
                <PageModule item={theItem} expanded={expanded} toggleExpansion={this.toggleExpansion}>
                    {modChildren}
                </PageModule>
            </>
        );
    }

    // a handler to start pre-loading an element
    private readonly onEnter = () => this.props.preloadModule(this.props.children.id, true);

    // toggles the expansion of an element
    private readonly toggleExpansion = () => this.props.toggleModuleExpansion(this.props.children.id);
}

class DeclarationElement extends React.Component<IDeclarationElementProps> {
    render() {
        const { children, ...rest } = this.props;

        // the current child
        const theDeclaration = this.props.getDeclaration(children.id) || children;

        // check if this element is currently expanded
        const expanded = this.props.isDeclarationExpanded(children.id);

        // if we are expanded and want some more children, get their information
        let modChildren: Array<React.ReactElement<INarrativeElementProps>> = [];
        if (expanded && !theDeclaration.ref && theDeclaration.declarations)
            modChildren = theDeclaration.declarations.map(d => (
                <NarrativeElement key={d.id} {...rest}>
                    {d}
                </NarrativeElement>
            ));

        // if we are expanded, render the components
        let modComponents: Array<React.ReactElement<IComponentProps>> = [];
        if (expanded && !theDeclaration.ref && theDeclaration.components)
            modComponents = theDeclaration.components.map(c => <PageComponent key={c.name}>{c}</PageComponent>);

        // and render the actual declaration
        return (
            <>
                <ReactWaypoint onEnter={this.onEnter} />
                <PageDeclaration item={theDeclaration} expanded={expanded} toggleExpansion={this.toggleExpansion}>
                    {[modChildren, modComponents]}
                </PageDeclaration>
            </>
        );
    }

    // a handler to start pre-loading an element
    private readonly onEnter = () => this.props.preloadDeclaration(this.props.children.id, true);

    // toggles the expansion of an element
    private readonly toggleExpansion = () => this.props.toggleDeclarationExpansion(this.props.children.id);
}
