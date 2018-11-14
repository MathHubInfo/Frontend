import * as React from "react";

import { MonospaceContainer } from "../../components/common";

import { Container, Header } from "semantic-ui-react";
import { Title } from "../../components/fragments";

import legalText from "../../../assets/content/imprint.txt";

export default function Imprint() {
    return (
        <Title title="Imprint">
            <>
                <Container text>
                    <Header as="h2">Imprint</Header>
                    <MonospaceContainer noTouch>{legalText}</MonospaceContainer>
                </Container>
            </>
        </Title>
    );
}
