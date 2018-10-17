import * as React from "react";

import { Card, Label } from "semantic-ui-react";
import { MathHTML } from "../../../components/common/mathhtml";
import { Nav } from "../../../components/common/nav";
import {
    IDocument, IDocumentRef,
    IModuleRef,
    INarrativeElement, INotebook,
    IOpaqueElement } from "../../../context/api";
import { encodeLibraryLink } from "../structure/links";

/** Views a list of narrative elements */
export class NarrativeElementViewList extends React.Component<{elements: INarrativeElement[]}> {
    public render() {
        const { elements } = this.props;

        // for now, we treat everything as a reference
        return (
            <Card.Group itemsPerRow="1">
                {elements.map((element) => <NarrativeElementViewItem key={element.id} element={element} />)}
            </Card.Group>
        );
    }
}

/** views a single narrative item */
class NarrativeElementViewItem extends React.Component<{element: INarrativeElement}> {
    public render() {
        const { element } = this.props;

        if (element.ref && (element.kind === "theory" || element.kind === "view")) {
            return <ModuleViewInline module={element} />;
        } else if (element.ref) {
            return <NarrativeElementViewRef element={element} />;
        } else if (element.kind === "opaque") {
            return <OpaqueViewInline element={element} />;
        } else {
            return <NarrativeElementViewInline element={element} />;
        }
    }
}

/** views a reference to a single narrative item */
class NarrativeElementViewRef extends React.Component<{element: IDocumentRef | IModuleRef}> {
    public render() {
        const { element } = this.props;

        // TODO: Re-work this element
        return (
            <Card>
                <Card.Content>
                    <Card.Description as={Nav} to={encodeLibraryLink(element)} >
                        <Label>{element.kind} reference</Label> &rArr; {element.id}
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}

/** views an inline narrative element */
class NarrativeElementViewInline extends React.Component<{element: IDocument | INotebook }> {
    public render() {
        const { element } = this.props;

        // TODO: Re-work this element; do we want a title for a document | Notebook ?
        return (
            <Card>
                <Card.Content>
                    <Card.Header as={Nav} to={encodeLibraryLink(element)} >
                        {element.name}
                    </Card.Header>
                    <Card.Description>
                        {element.id}
                        <Label>{element.kind}</Label>
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}

/** views a module reference */
class ModuleViewInline extends React.Component<{module: IModuleRef}> {
    public render() {
        const {module} = this.props;

        // TODO: Allow this to be expandable
        return (
            <Card>
                <Card.Content>
                    <Label>{module.kind} reference</Label>
                    {module.name}
                </Card.Content>
            </Card>
        );
    }
}

/** views an opaque element */
class OpaqueViewInline extends React.Component<{element: IOpaqueElement}> {
    public render() {
        const {element} = this.props;

        // TODO: Potential injection, look at the content type (once we get to it)
        return (
            <Card>
                <Card.Content>
                    <MathHTML as={Card.Description}>{element.content}</MathHTML>
                </Card.Content>
            </Card>
        );
    }
}
