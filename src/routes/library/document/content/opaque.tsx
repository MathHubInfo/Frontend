import * as React from "react";

import { Card } from "semantic-ui-react";

import { IOpaqueElement } from "../../../../api";
import { HTML } from "../../../../components/fragments";

export default class OpaqueContentInline extends React.Component<{element: IOpaqueElement}> {
    public render() {
        const {element} = this.props;

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
