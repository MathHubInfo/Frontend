import * as React from "react";
import { Container, Divider, Grid, Header, Image } from "semantic-ui-react";
import MHLink from "../../components/MHLink";
import { TranslateProps, WithTranslate } from "../../locales/WithTranslate";
import { IMathHubVersion } from "../../types/config";

interface ILayoutFooterProps {
    version: IMathHubVersion;
}

class LayoutFooter extends React.Component<ILayoutFooterProps & TranslateProps> {
    render() {
        const { version, t } = this.props;

        return (
            <Container>
                <Grid divided inverted stackable>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Header as="h4" content={t("developed")} />
                            <Image
                                size="tiny"
                                title="wwww.kwarc.info"
                                src={"/static/logos/kwarc_logo.png"}
                                style={{ marginRight: "1.5em" }}
                                alt="kwarc Logo"
                                href={"https://kwarc.info/"}
                            />
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Header as="h4" content={t("institutions")} />
                            <Image
                                size="tiny"
                                title="www.fau.eu"
                                src={"/static/logos/fau_logo.png"}
                                style={{ marginRight: "1.5em" }}
                                alt="FAU Logo"
                                inline
                                href={"https://www.fau.eu/"}
                            />
                            <Image
                                size="tiny"
                                title="www.opendreamkit.org"
                                src={"/static/logos/odk_logo.png"}
                                alt="ODK Logo"
                                inline
                                href={"https://opendreamkit.org/"}
                            />
                            <Image
                                size="tiny"
                                title="www.jacobs-university.de"
                                src={"/static/logos/jacobs_logo.png"}
                                style={{ marginRight: "1.5em" }}
                                alt="Jacobs University Logo"
                                inline
                                href={"https://www.jacobs-university.de/"}
                            />
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Header as="h4" content={t("funding")} />
                            <Image
                                size="tiny"
                                src={"/static/logos/eu_logo.png"}
                                title="ec.europa.eu/info/research-and-innovation_en"
                                style={{ marginRight: "1.5em" }}
                                alt="EU Logo"
                                inline
                                href={"https://ec.europa.eu/info/research-and-innovation_en"}
                            />
                            <Image
                                size="tiny"
                                src={"/static/logos/leibniz_logo.png"}
                                title="www.leibniz-gemeinschaft.de"
                                style={{ marginRight: "1.5em" }}
                                alt="leibniz Logo"
                                inline
                                href={"https://www.leibniz-gemeinschaft.de/"}
                            />
                            <Image
                                size="tiny"
                                src={"/static/logos/dfg_logo.png"}
                                title="www.dfg.de"
                                style={{ marginRight: "1.5em" }}
                                alt="dfg University Logo"
                                inline
                                // DFG: Fix this

                                href={"http://dfg.de"}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Divider />
                <Grid>
                    <Grid.Column width={4}>
                        <small>
                            <MathHubVersion version={version} t={t} />
                        </small>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <MHLink href="/applications/logger">
                            <a>{t("logger")}</a>
                        </MHLink>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <MHLink href="/legal/notices">
                            <a>{t("license and notices")}</a>
                        </MHLink>
                        <br />
                        <MHLink href="/legal/imprint">
                            <a>{t("imprint")}</a>
                        </MHLink>
                        <br />
                        <a href="https://privacy.kwarc.info/">{t("policy")}</a>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

export default WithTranslate(LayoutFooter);

class MathHubVersion extends React.Component<{ version: IMathHubVersion } & TranslateProps> {
    render() {
        const {
            t,
            version: { semantic, git, configTime },
        } = this.props;
        const cfgTime = new Date(configTime).toISOString();

        let version = t("version", { version: semantic, time: cfgTime });

        if (git) {
            version += ` (${t("from")} `;
            if (git.dirty === true) version += "dirty ";
            else if (git.dirty === false) version += "clean ";
            version += `commit ${git.hash}`;
            if (git.branch) version += ` ${t("branch")} ${git.branch}`;
            version += ")";
        }

        return version;
    }
}
