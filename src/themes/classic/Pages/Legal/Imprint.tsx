import * as React from "react";
import { Container } from "semantic-ui-react";

import { IImprintProps } from "../../../../theming/Pages/Legal/IImprintProps";

export default class Imprint extends React.Component<IImprintProps> {
    render() {
        return (
            <Container>
                <pre>
                    {this.props.imprint}
                </pre>
            </Container>
        );
    }
}
