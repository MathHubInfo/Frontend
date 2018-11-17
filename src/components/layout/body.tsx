import * as React from "react";

import { Container, Divider } from "semantic-ui-react";

import { BodySlot } from "./slots";

export default function Body(props: {}) {
    return (
        <>
            <Container text style={{ marginTop: "7em" }}>
                TODO: Header here
                <Divider />
            </Container>
            <Container>
                <BodySlot />
            </Container>
        </>
    );
}
