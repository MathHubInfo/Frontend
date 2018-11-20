import * as React from "react";
import { Card } from "semantic-ui-react";

import { IArchiveRef, IGroupRef } from "../../../Clients/MMTClient/objects";

import { encodeLibraryLink } from "../Structure/Links";

import { Nav } from "../../../Components/Common";
import { HTML } from "../../../Components/Fragments";

type ContentRef = IGroupRef | IArchiveRef;

// a list of referencable library items
export class List extends React.Component<{items: ContentRef[]}> {
    render() {
        const {items} = this.props;

        return (
            <Card.Group itemsPerRow="2">
                {items.map(item => <ContentItemRef key={item.id} item={item} />)}
            </Card.Group>
        );
    }
}

// A clickable reference to a group
class ContentItemRef extends React.Component<{item: ContentRef}> {
    render() {
        const {item} = this.props;

        return (
            <Card>
                <Card.Content>
                    <HTML as={Card.Header} extra={{as: Nav, to: encodeLibraryLink(item)}}>{item.title}</HTML>
                    <HTML as={Card.Description} renderReferences>{item.teaser}</HTML>
                </Card.Content>
            </Card>
        );
    }
}
