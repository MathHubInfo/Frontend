import * as React from "react";

import { MonospaceContainer } from "../../components/common";

import { Container, Header } from "semantic-ui-react";
import { MHTitle } from "../../utils/title";

import legalText from "../../../assets/content/imprint.txt";

export function Imprint() {
    return (
        <MHTitle title="Imprint">
            <>
                <Container text>
                    <Header as="h2">Imprint</Header>
                    <MonospaceContainer noTouch>{legalText}</MonospaceContainer>
                </Container>
            </>
        </MHTitle>
    );
}
