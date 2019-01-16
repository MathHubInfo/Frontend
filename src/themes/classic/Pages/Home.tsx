import * as React from "react";
import { Button, Grid } from "semantic-ui-react";

import MHLink from "../../../lib/components/MHLink";

import { IHomeProps } from "../../../theming/Pages/IHomeProps";

import MHHTML from "../../../lib/components/MHHTML";

export default class Home extends React.Component<IHomeProps> {
    render() {
        return (
            <>
                <MHHTML as="div">{this.props.children}</MHHTML>
                <div>
                    <h2>Content</h2>
                    <Grid>
                        <Grid.Column width={5}>
                            <div>Place Image here</div>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <MHLink href="/library">
                                <Button size={"small"} fluid style={{ marginBottom: "0.8em" }}>
                                    MathHub Libraries
                                </Button>
                            </MHLink>
                            <br />
                            <a href={"https://github.com/MathHubInfo/Documentation/wiki/libraries"}>
                                <Button size={"small"} fluid style={{ marginBottom: "0.8em" }}>
                                    provide groups of
                            </Button>
                            </a>
                            <br />
                            <a href={"https://github.com/MathHubInfo/Documentation/wiki/math-archives"}>
                                <Button size={"small"} fluid style={{ marginBottom: "0.8em" }}>archives</Button>
                            </a>
                            <br />
                            <MHLink href="/news">
                                <Button size={"small"} fluid>
                                    News
                        </Button>
                            </MHLink>
                        </Grid.Column>
                    </Grid>
                </div>
                <div>
                    <h2>Applications</h2>
                    <ul>
                        <li>
                            <MHLink href="/applications/dictionary"><a>Dictionary</a></MHLink>
                        </li>
                        <li>
                            <MHLink href="/applications/glossary"><a>Glossary</a></MHLink>
                        </li>
                        <li>
                            <MHLink href="/applications/keys"><a>Keys</a></MHLink>
                        </li>
                        <li>
                            <MHLink href="/applications/logger"><a>Logger</a></MHLink>
                        </li>
                    </ul>
                </div>
            </>
        );
    }
}
