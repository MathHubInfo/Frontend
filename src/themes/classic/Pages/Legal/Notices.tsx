import * as React from "react";
import { Container } from "semantic-ui-react";
import intl from "react-intl-universal";

import { INoticesProps } from "../../../../theming/Pages/Legal/INoticesProps";

export default class Notices extends React.Component<INoticesProps> {
    render() {
        return (
            <Container>
                <h2>{intl.get("license")}</h2>
                <pre>{this.props.license}</pre>
                <h2>{intl.get("notices")}</h2>
                <pre>{this.props.notices}</pre>
            </Container>
        );
    }
}
