import * as React from "react";
import { Card } from "semantic-ui-react";
import { MathHTML } from "../../../components/common/mathhtml";
import { Nav } from "../../../components/common/nav";
import { IArchiveRef, IGroupRef } from "../../../context/api";
import { encodeLibraryLink } from "../structure/links";

type ContentRef = IGroupRef | IArchiveRef;

/** a list of referencable library items */
export class ContentItemList extends React.Component<{items: ContentRef[]}> {
    public render() {
        const {items} = this.props;

        return (
            <Card.Group itemsPerRow="1">
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
                    <MathHTML as={Card.Header} extra={{as: Nav, to: encodeLibraryLink(item)}}>{item.title}</MathHTML>
                    <MathHTML as={Card.Description} renderReferences>{item.teaser}</MathHTML>
                </Card.Content>
            </Card>
        );
    }
}
