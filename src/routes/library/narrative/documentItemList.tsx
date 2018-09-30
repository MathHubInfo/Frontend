import * as React from "react";

import { Card } from "semantic-ui-react";
import { MathHTML } from "../../../components/common/mathhtml";
import { Nav } from "../../../components/common/nav";
import { INarrativeElement } from "../../../context/api";
import { encodeLibraryLink } from "./../";

export class DocumentItemList extends React.Component<{nRoot: INarrativeElement[]}> {
    public render() {
        const {nRoot} = this.props;
        if (typeof nRoot === "undefined") {
            return null;
        }
        return (
            <Card.Group itemsPerRow="1">
                {nRoot.map((narrative) => <DocumentListItem key={narrative.id} narrative={narrative} />)}
            </Card.Group>
        );
    }
}

class DocumentListItem extends React.Component<{narrative: INarrativeElement}> {
    public render() {
        const {narrative} = this.props;
        if (narrative.kind !== "document" && narrative.kind !== "notebook") {
            return null;
        }
        return (
            <Card>
                <Card.Content>
                    <Card.Header as={Nav} to={encodeLibraryLink(narrative)} >
                        <MathHTML content={narrative.name} />
                    </Card.Header>
                    <Card.Description>
                        <MathHTML content={narrative.id} />
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}
