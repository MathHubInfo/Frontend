import * as React from "react";
import intl from "react-intl-universal";
import { Container } from "semantic-ui-react";

interface INoticesProps {
    /**
     * the legal text of required notices
     */
    notices: string | undefined;

    /**
     * The MathHub License Text
     */
    license: string;
}

export default class PageLegalNotices extends React.Component<INoticesProps> {
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
