import * as React from "react";

import { Card, Label } from "semantic-ui-react";
import { MonospaceContainer } from "../../../components/common/monospace";
import {
    IDocument, IDocumentRef,
    IModuleRef,
    INarrativeElement, INotebook,
    IOpaqueElement } from "../../../context/api";

/** Shows the source view of a list of elements */
export class NarrativeElementSourceList extends React.Component<{elements: INarrativeElement[]}> {
    public render() {
        const { elements } = this.props;

        // for now, we treat everything as a reference
        return (
            <Card.Group itemsPerRow="1">
                {elements.map((element) => <NarrativeElementSourceItem key={element.id} element={element} />)}
            </Card.Group>
        );
    }
}

/** source code of a single item */
class NarrativeElementSourceItem extends React.Component<{element: INarrativeElement}> {
    public render() {
        const { element } = this.props;

        if (element.ref) {
            return <NarrativeElementSourceRef element={element} />;
        } else if (element.kind === "opaque") {
            return <OpaqueSourceInline element={element} />;
        } else {
            return <NarrativeElementSourceInline element={element} />;
        }
    }
}

/** Renders the source view of a reference to a narrative element */
class NarrativeElementSourceRef extends React.Component<{element: IDocumentRef | IModuleRef}> {
    public render() {
        // refs do not have any source
        return null;
    }
}

class NarrativeElementSourceInline extends React.Component<{element: IDocument | INotebook }> {
    public render() {
        // TODO: We should have some source code here, but for now we do not
        return null;
    }
}

class OpaqueSourceInline extends React.Component<{element: IOpaqueElement}> {
    public render() {
        const {element} = this.props;

        return (
            <Card>
                <Card.Content>
                    <Label>{element.contentFormat}</Label>
                    <MonospaceContainer>
                        {element.content}
                    </MonospaceContainer>
                </Card.Content>
            </Card>
        );
    }
}
