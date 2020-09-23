import * as React from "react";
import intl from "react-intl-universal";
import { Button, Container, Grid, Image } from "semantic-ui-react";
import MHHTML from "../../lib/components/MHHTML";
import MHLink from "../../lib/components/MHLink";

interface IHomeProps {
    children: string;
}

export default class PageHome extends React.Component<IHomeProps> {
    render() {
        return (
            <Container>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <MHHTML as="div">{intl.get("introduction")}</MHHTML>
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
                                <Button
                                    size={"small"}
                                    fluid
                                    style={{ marginBottom: "0.8em", backgroundColor: "#4F81BD" }}
                                >
                                    <h4>{intl.get("libraries")}</h4>
                                </Button>
                            </MHLink>
                            <a href={"https://github.com/MathHubInfo/Documentation/wiki/libraries"}>
                                <Button
                                    size={"small"}
                                    fluid
                                    style={{ marginBottom: "0.8em", backgroundColor: "#4F81BD" }}
                                >
                                    <h4>{intl.get("provide")}</h4>
                                </Button>
                            </a>
                            <a href={"https://github.com/MathHubInfo/Documentation/wiki/math-archives"}>
                                <Button
                                    size={"small"}
                                    fluid
                                    style={{ marginBottom: "0.8em", backgroundColor: "#4F81BD" }}
                                >
                                    <h4>{intl.get("archives")}</h4>
                                </Button>
                            </a>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}
