import * as React from "react";

import { Container, Divider } from "semantic-ui-react";
import { BreadCrumbsSlot, TextSlot, TitleSlot } from "./slots";

export default class Body extends React.Component {
    public render() {
        return (
            <>
                <Container text style={{ marginTop: "7em" }}>
                    <BreadCrumbsSlot />
                    <TitleSlot />
                    <Container>
                        <TextSlot />
                    </Container>
                </Container>
                <Divider />
                <Container>
                    {this.props.children}
                </Container>
            </>
        );
    }
}
