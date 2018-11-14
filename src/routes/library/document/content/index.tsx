import * as React from "react";

import { Card, Label } from "semantic-ui-react";
import {
    IDocument, IDocumentRef,
    IModuleRef,
    INarrativeElement } from "../../../../clients";
import { Nav } from "../../../../components/common";
import { encodeLibraryLink } from "../../structure/links";

import ModuleContentInline from "./module";
import OpaqueContentInline from "./opaque";

export default function NarrativeElementContentList(props: {elements: INarrativeElement[]}) {
    const { elements } = props;

    return (
        <Card.Group itemsPerRow="1">
            {elements.map((element) => <NarrativeElementViewItem key={element.id} element={element} />)}
        </Card.Group>
    );
}

function NarrativeElementViewItem(props: {element: INarrativeElement}) {
    const { element } = props;
    if (element.ref && (element.kind === "theory" || element.kind === "view")) {
        return <ModuleContentInline module={element} />;
    } else if (element.kind === "opaque") {
        return <OpaqueContentInline element={element} />;
    } else {
        return <ContentRef element={element} />;
    }
}

function ContentRef(props: {element: IDocument | IDocumentRef | IModuleRef}) {
    const { element } = props;
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
