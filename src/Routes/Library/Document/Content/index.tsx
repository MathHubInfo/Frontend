import * as React from "react";
import { Card, Label } from "semantic-ui-react";

import {
    IDocument, IDocumentRef,
    IModuleRef,
    INarrativeElement } from "../../../../Clients/LibraryClient/objects";
import { Nav } from "../../../../Components/Common";
import { encodeLibraryLink } from "../../Structure/Links";

import Module from "./Module";
import Opaque from "./Opaque";

// tslint:disable-next-line:export-name
export default function Content(props: {elements: INarrativeElement[]}) {
    const { elements } = props;

    return (
        <Card.Group itemsPerRow="1">
            {elements.map(element => <NarrativeElementViewItem key={element.id} element={element} />)}
        </Card.Group>
    );
}

function NarrativeElementViewItem(props: {element: INarrativeElement}) {
    const { element } = props;
    if (element.ref && element.kind === "module")
        return <Module mod={element} />;
    else if (element.kind === "opaque")
        return <Opaque element={element} />;
    else
        return <ContentRef element={element} />;
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
