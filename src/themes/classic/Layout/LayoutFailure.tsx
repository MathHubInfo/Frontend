import * as React from "react";
import { Container, Icon } from "semantic-ui-react";

import { DerivedDataStatus } from "../../../utils/getDerivedParameter";

import { ILayoutFailureProps } from "../../../theming/Layout/ILayoutFailureProps";
import LayoutBody from "../../../theming/Layout/LayoutBody";


export default class LayoutFailure extends React.Component<ILayoutFailureProps> {
    render() {
        const { status, statusCode, crumbs } = this.props;

        let title = "Not Found";
        let text = "We're sorry but it seems like the page you are looking for does not exist";
        if (status === DerivedDataStatus.MISSING_VALUE) {
             title = "Missing URL parameter";
             text = "You are missing a paramter. Please check the URL and try again.";
        }
        if (statusCode === 500 || status === DerivedDataStatus.ERROR_DERIVATION) {
            title = "Something went wrong";
            text = "";
        }

        return (
            <LayoutBody crumbs={crumbs} title={[title]}>
                <Container>
                    <Icon name={"frown outline"} size={"huge"} />
                    <div>HTTP {statusCode}: {title}</div>
                    <div>{text}</div>
                </Container>
            </LayoutBody>
        );
    }
}
