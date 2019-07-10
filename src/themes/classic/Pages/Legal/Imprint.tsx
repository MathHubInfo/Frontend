import * as React from "react";
import { Container } from "semantic-ui-react";
import intl from "react-intl-universal";

import { IImprintProps } from "../../../../theming/Pages/Legal/IImprintProps";

export default class Imprint extends React.Component<IImprintProps> {
    render() {
        return (
            <Container>
                <div>{intl.get("imprint responsible")}</div>
                <pre>
                    {this.props.imprint}
                </pre>
            </Container>
        );
    }
}
