import * as React from "react";
import { Link } from "react-router-dom";
import { Container, Divider, Grid, Header, Image, List, Segment } from "semantic-ui-react";

import { IMMTVersionInfo } from "../../Clients/MMTClient/objects";
import { IMathHubContext, withContext } from "../../Context";
import { Nav } from "../Common";
import { PromiseLoader } from "../Loaders";

class Footer extends React.Component<{context: IMathHubContext}> {
  render() {
      return (
        <Segment vertical style={{ margin: "2em 0em 0em", padding: "2em 0em"}}>
          <Container textAlign="left">
            <Divider inverted section />
            <FooterLogos />
            <Divider inverted section />
            <Grid divided inverted stackable>
              <Grid.Column width={4}>
                <small>
                  {Footer.getFooter()}
                </small>
              </Grid.Column>
              <Grid.Column width={4}>
                <small>
                  <PromiseLoader promise={this.getMMTVersion}>
                    {(version: IMMTVersionInfo) => <MMTVersionFooter version={version} />}
                  </PromiseLoader>
                </small>
              </Grid.Column>
              <Grid.Column width={3} floated={"right"}>
                <List link>
                  <List.Item as={Nav} to={"/legal/imprint"} style={{color : "black"}}>Imprint</List.Item>
                  <List.Item
                    as="a"
                    href="https://privacy.kwarc.info/"
                    target="_blank"
                    style={{color : "black"}}
                  >
                    Privacy Policy
                  </List.Item>
                  <List.Item as={Nav} to={"/legal/licenses"} style={{color : "black"}}>Licenses</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3} />
            </Grid>
          </Container>
        </Segment>
      );
    }

  private readonly getMMTVersion = async () => this.props.context.mmtClient.getMMTVersion();

  private static getFooter() {
    return (process.env.NODE_ENV === "production") ? Footer.getProdFooter() : Footer.getDevelFooter();
  }

  private static getProdFooter() {
    const version = process.env.MATHHUB_VERSION || "MISSING";
    const date = (new Date(parseInt(process.env.MATHHUB_BUILD_TIME || "0", 10))).toString();

    return (
      <>
        MathHub Version {version}<br />
        (built {date})
      </>
    );
  }

  private static getDevelFooter() {
    const version = process.env.MATHHUB_VERSION || "MISSING";
    const date = (new Date(parseInt(process.env.MATHHUB_BUILD_TIME || "0", 10))).toString();

    return (
      <>
        MathHub Version {version}<br />
        (built {date} in development mode)<br />
        <Link to="/devel">Testing Page</Link>
      </>
    );
  }
}

// tslint:disable-next-line:export-name
export default withContext(Footer);

function FooterLogos() {
  return (
    <Grid divided inverted stackable>
      <Grid.Row>
        <Grid.Column width={4}>
          <Header as="h4" content="Developed by:" />
          <Image
                        size="tiny"
                        title="wwww.kwarc.info"
                        // tslint:disable-next-line:no-require-imports
                        src={require("../../../assets/logos/kwarc_logo.png")}
                        style={{ marginRight: "1.5em" }}
                        alt="kwarc Logo"
                        href={"https://kwarc.info/"}
          />
          </Grid.Column>
        <Grid.Column width={5}>
          <Header as="h4" content="Institutions:" />
          <Image
                        size="tiny"
                        title="www.fau.eu"
                        // tslint:disable-next-line:no-require-imports
                        src={require("../../../assets/logos/fau_logo.png")}
                        style={{ marginRight: "1.5em" }}
                        alt="FAU Logo"
                        inline
                        href={"https://www.fau.eu/"}
          />
          <Image
                        size="tiny"
                        title="www.opendreamkit.org"
                        // tslint:disable-next-line:no-require-imports
                        src={require("../../../assets/logos/odk_logo.png")}
                        alt="ODK Logo"
                        inline
                        href={"https://opendreamkit.org/"}
          />
          <Image
                        size="tiny"
                        title="www.jacobs-university.de"
                        // tslint:disable-next-line:no-require-imports
                        src={require("../../../assets/logos/jacobs_logo.png")}
                        style={{ marginRight: "1.5em" }}
                        alt="Jacobs University Logo"
                        inline
                        href={"https://www.jacobs-university.de/"}
          />
          </Grid.Column>
        <Grid.Column width={5}>
          <Header as="h4" content="Funding:" />
          <Image
                        size="tiny"
                        // tslint:disable-next-line:no-require-imports
                        src={require("../../../assets/logos/eu_logo.png")}
                        title="ec.europa.eu/info/research-and-innovation_en"
                        style={{ marginRight: "1.5em" }}
                        alt="EU Logo"
                        inline
                        href={"https://ec.europa.eu/info/research-and-innovation_en"}
          />
          <Image
                        size="tiny"
                        // tslint:disable-next-line:no-require-imports
                        src={require("../../../assets/logos/leibniz_logo.png")}
                        title="www.leibniz-gemeinschaft.de"
                        style={{ marginRight: "1.5em" }}
                        alt="leibniz Logo"
                        inline
                        href={"https://www.leibniz-gemeinschaft.de/"}
          />
          <Image
                        size="tiny"
                        // tslint:disable-next-line:no-require-imports
                        src={require("../../../assets/logos/dfg_logo.png")}
                        title="www.dfg.de"
                        style={{ marginRight: "1.5em" }}
                        alt="dfg University Logo"
                        inline

                        // DFG: Fix this
                        // tslint:disable-next-line:no-http-string
                        href={"http://dfg.de"}
          />
          </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

// MMT Version Information
function MMTVersionFooter(props: {version: IMMTVersionInfo}) {
  return (
    <List>
      <List.Item>
        MMT Version {props.version.versionNumber}
        {props.version.buildDate && <><br />
          (built {new Date(parseInt(props.version.buildDate || "0", 10)).toString()})
        </>}
      </List.Item>
      <List.Item as={Nav} to={"/applications/logger"}>View Log</List.Item>
    </List>
  );
}
