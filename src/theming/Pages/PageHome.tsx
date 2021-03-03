import * as React from "react";
import { Button, Container, Grid, Image } from "semantic-ui-react";
import MHHTML from "../../components/MHHTML";
import MHLink from "../../components/MHLink";
import { TranslateProps, WithTranslate } from "../../locales/WithTranslate";

interface IHomeProps {
    children: string;
}

class PageHome extends React.Component<IHomeProps & TranslateProps> {
    render() {
        const { t } = this.props;
        return (
            <Container>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <MHHTML as="div">{t("introduction")}</MHHTML>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <MHLink href="/library">
                                <Image src="/static/library.jpg" title="Mathhub libraries" />
                            </MHLink>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <MHLink href="/library">
                                <Button
                                    size={"small"}
                                    fluid
                                    style={{ marginBottom: "0.8em", backgroundColor: "#4F81BD" }}
                                >
                                    <h4>{t("libraries")}</h4>
                                </Button>
                            </MHLink>
                            <a href={"https://github.com/MathHubInfo/Documentation/wiki/libraries"}>
                                <Button
                                    size={"small"}
                                    fluid
                                    style={{ marginBottom: "0.8em", backgroundColor: "#4F81BD" }}
                                >
                                    <h4>{t("provide")}</h4>
                                </Button>
                            </a>
                            <a href={"https://github.com/MathHubInfo/Documentation/wiki/math-archives"}>
                                <Button
                                    size={"small"}
                                    fluid
                                    style={{ marginBottom: "0.8em", backgroundColor: "#4F81BD" }}
                                >
                                    <h4>{t("archives")}</h4>
                                </Button>
                            </a>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default WithTranslate(PageHome);
