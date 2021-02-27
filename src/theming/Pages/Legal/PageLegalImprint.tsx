import * as React from "react";
import intl from "react-intl-universal";
import { Container } from "semantic-ui-react";

interface IImprintProps {
    /**
     * The text of the imprint
     */
    imprint: string;
}

export default class PageLegalImprint extends React.Component<IImprintProps> {
    render() {
        return (
            <Container>
                <div>{intl.get("imprint responsible")}</div>
                <pre>{this.props.imprint}</pre>
            </Container>
        );
    }
}
