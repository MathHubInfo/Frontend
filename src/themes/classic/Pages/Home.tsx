import * as React from "react";
import { Button, Container, Grid, Image } from "semantic-ui-react";
import intl from "react-intl-universal";

import MHLink from "../../../lib/components/MHLink";

import { IHomeProps } from "../../../theming/Pages/IHomeProps";

import MHHTML from "../../../lib/components/MHHTML";

export default class Home extends React.Component<IHomeProps> {
    render() {
        return (
            <Container>
                <div>{intl.get("TEST")}</div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <MHHTML as="div">{this.props.children}</MHHTML>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <MHLink href="/library">
                                <Image
                                    src="/static/library.jpg"
                                    title="Mathhub libraries"
                                />
                            </MHLink>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <MHLink href="/library">
                                <Button size={"small"} fluid style={{ marginBottom: "0.8em" }}>
                                    MathHub Libraries
                                </Button>
                            </MHLink>
                            <a href={"https://github.com/MathHubInfo/Documentation/wiki/libraries"}>
                                <Button size={"small"} fluid style={{ marginBottom: "0.8em" }}>
                                    provide groups of
                            </Button>
                            </a>
                            <a href={"https://github.com/MathHubInfo/Documentation/wiki/math-archives"}>
                                <Button size={"small"} fluid style={{ marginBottom: "0.8em" }}>archives</Button>
                            </a>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}
