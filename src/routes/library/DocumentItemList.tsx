import * as React from "react";

import { Card } from "semantic-ui-react";
import { Nav } from "../../components/common/nav";
import { INarrativeElement } from "../../context/api";
import { encodeLink } from "./";

export class DocumentItemList extends React.Component<{nRoot: INarrativeElement[]}> {
    public render() {
        const {nRoot} = this.props;
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
        return (
            <Card>
                <Card.Content>
                    <Card.Header as={Nav} to={encodeLink(narrative)} >
                        <div dangerouslySetInnerHTML={{__html: narrative.name}} />
                    </Card.Header>
                    <Card.Description>
                        <div dangerouslySetInnerHTML={{__html: narrative.id}} />
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}
