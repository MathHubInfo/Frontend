import * as React from "react";

import { Waypoint as ReactWaypoint } from "react-waypoint";

import PageDocumentRef from "../../theming/Pages/Library/PageDocumentRef";

import { IComponentProps } from "../../theming/Pages/Library/IComponentProps";
import PageModule from "../../theming/Pages/Library/PageModule";
import PageOpaque from "../../theming/Pages/Library/PageOpaque";

import PageComponent from "../../theming/Pages/Library/PageComponent";
import PageDeclaration from "../../theming/Pages/Library/PageDeclaration";

import { IDeclarationElementProps, IModuleElementProps, INarrativeElementProps } from "./INarrativeElementProps";

export default class NarrativeElement extends React.Component<INarrativeElementProps> {
    render() {
        const {children} = this.props;

        switch (children.kind) {
            case "document":
                const link = {href: "/library/document", query: {id: children.id}};

                return <PageDocumentRef item={children} link={link} />;

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
    state = {item: this.props.children, expanded: false};

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
            modChildren = theItem.declarations
                .map(d => (
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
            modChildren = theDeclaration.declarations
                .map(d => <NarrativeElement key={d.id} {...rest}>{d}</NarrativeElement>);

        // if we are expanded, render the components
        let modComponents: Array<React.ReactElement<IComponentProps>> = [];
        if (expanded && !theDeclaration.ref && theDeclaration.components)
            modComponents = theDeclaration.components
                .map(c => <PageComponent key={c.name}>{c}</PageComponent>);

        // and render the actual declaration
        return (
            <>
                <ReactWaypoint onEnter={this.onEnter} />
                <PageDeclaration
                    item={theDeclaration}
                    expanded={expanded}
                    toggleExpansion={this.toggleExpansion}
                    children={[modChildren, modComponents]}
                />
            </>
        );
    }

    // a handler to start pre-loading an element
    private readonly onEnter = () => this.props.preloadDeclaration(this.props.children.id, true);

    // toggles the expansion of an element
    private readonly toggleExpansion = () => this.props.toggleDeclarationExpansion(this.props.children.id);
}
