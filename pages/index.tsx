import dynamic from "next/dynamic";
import * as React from "react";
import { TranslateProps, WithTranslate } from "../src/locales/WithTranslate";
import { Button, Grid, Image } from "semantic-ui-react";
import MHHTML from "../src/components/MHHTML";
import MHLink from "../src/components/MHLink";
import styles from "./index.module.css";

const LayoutBody = dynamic(() => import("../src/layout/LayoutBody"));

class Home extends React.Component<TranslateProps> {
    static crumbs = [];
    render() {
        const { t } = this.props;
        return (
            <LayoutBody crumbs={Home.crumbs} title={[t("home")]} description={t("home")}>
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
                                <Button size={"small"} fluid className={styles.HomeButton}>
                                    <h4>{t("libraries")}</h4>
                                </Button>
                            </MHLink>
                            <a href={"https://github.com/MathHubInfo/Documentation/wiki/libraries"}>
                                <Button size={"small"} fluid className={styles.HomeButton}>
                                    <h4>{t("provide")}</h4>
                                </Button>
                            </a>
                            <a href={"https://github.com/MathHubInfo/Documentation/wiki/math-archives"}>
                                <Button size={"small"} fluid className={styles.HomeButton}>
                                    <h4>{t("archives")}</h4>
                                </Button>
                            </a>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </LayoutBody>
        );
    }
}

export default WithTranslate(Home);
