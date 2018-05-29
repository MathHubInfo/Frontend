import * as React from "react";

import {LegalContainer} from "./container";

import { Container, Header } from "semantic-ui-react";
import { MHTitle } from "../../utils/title";

import legalText from "../../../assets/imprint.txt";

export class Imprint extends React.Component<{}> {
    public render() {
        return (
            <MHTitle title="Licenses">
                <>
                    <Container text>
                        <Header as="h2">Imprint</Header>
                        <LegalContainer text={legalText} />
                    </Container>
                </>
            </MHTitle>
        );
    }
}
