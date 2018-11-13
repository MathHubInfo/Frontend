import * as React from "react";

import { Card } from "semantic-ui-react";

import { IOpaqueElement } from "../../../../api";
import { MathHTML } from "../../../../components/common";

export default class OpaqueContentInline extends React.Component<{element: IOpaqueElement}> {
    public render() {
        const {element} = this.props;

        // TODO: Potential injection, look at the content type (once we get to it)
        return (
            <Card>
                <Card.Content>
                    <MathHTML as={Card.Description}>{element.content}</MathHTML>
                </Card.Content>
            </Card>
        );
    }
}
