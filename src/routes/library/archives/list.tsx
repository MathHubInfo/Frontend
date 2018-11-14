import * as React from "react";
import { Card } from "semantic-ui-react";

import { IArchiveRef, IGroupRef } from "../../../clients/mmt/objects";

import { encodeLibraryLink } from "../structure/links";

import { Nav } from "../../../components/common";
import { HTML } from "../../../components/fragments";

type ContentRef = IGroupRef | IArchiveRef;

/** a list of referencable library items */
export class ContentItemList extends React.Component<{items: ContentRef[]}> {
    public render() {
        const {items} = this.props;

        return (
            <Card.Group itemsPerRow="2">
                {items.map((item) => <ContentItemRef key={item.id} item={item} />)}
            </Card.Group>
        );
    }
}

/** A clickable reference to a group */
class ContentItemRef extends React.Component<{item: ContentRef}> {
    public render() {
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
