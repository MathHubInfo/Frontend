import * as React from "react";
import { Container } from "semantic-ui-react";

import { INoticesProps } from "../../../../theming/Pages/Legal/INoticesProps";

export default class Notices extends React.Component<INoticesProps> {
    render() {
        return (
            <Container>
                <h2>License</h2>
                <pre>{this.props.license}</pre>
                <h2>Notices</h2>
                <pre>{this.props.notices}</pre>
            </Container>
        );
    }
}
