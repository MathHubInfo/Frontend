import * as React from "react";

import { Card } from "semantic-ui-react";

import { IOpaqueElement } from "../../../../Clients/MMTClient/objects";
import { HTML } from "../../../../Components/Fragments";

export default class Opaque extends React.Component<{element: IOpaqueElement}> {
    render() {
        const {element} = this.props;

        // tslint:disable-next-line:no-suspicious-comment
        // TODO: Potential injection, look at the content type (once we get to it)
        return (
            <Card>
                <Card.Content>
                    <HTML as={Card.Description}>{element.content}</HTML>
                </Card.Content>
            </Card>
        );
    }
}
