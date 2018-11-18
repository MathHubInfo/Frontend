import * as React from "react";
import { Link } from "react-router-dom";

import { Button, Grid, Image } from "semantic-ui-react";

import { HTML, MHBreadCrumbs, MHText, MHTitle } from "../components/fragments";
import { LoadWithSpinner } from "../components/loaders";

import { encodeLibraryLink } from "./library/structure/links";

export class Home extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
        this.loadContent = this.loadContent.bind(this);
    }

    private async getHomeText() { return (await import("../../assets/content/HOME.txt")).default; }
    private loadContent() { return Promise.all([this.getHomeText()]); }

    public render() {
        // MHTitle can not use autocrumbs here
        // because Home is prepended to every one of them
        return (
            <MHTitle title="Home">
                <MHBreadCrumbs crumbs={[]} />
                <MHText>
                    <LoadWithSpinner promise={this.loadContent} title="HOME">{
                        ([h]) => <HTML renderReferences children={h} />}
                    </LoadWithSpinner>
                </MHText>
                <Grid>
                    <Grid.Column width={10}>
                        <Link to={encodeLibraryLink()}>
                            <Image
                                src={require("../../../assets/library.jpg")}
                                title="MathHub Libraries"
                                inline={true}
                            />
                        </Link>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Link to={encodeLibraryLink()}>
                            <Button size={"small"} fluid style={{ marginBottom: "0.8em" }}>
                                MathHub Libraries
                            </Button>
                        </Link>
                        <a href={"https://github.com/MathHubInfo/Documentation/wiki/libraries"}>
                            <Button size={"small"} fluid style={{ marginBottom: "0.8em" }}>
                                provide groups of
                            </Button>
                        </a>
                        <a href={"https://github.com/MathHubInfo/Documentation/wiki/math-archives"}>
                            <Button size={"small"} fluid>archives</Button>
                        </a>
                    </Grid.Column>
                </Grid>
            </MHTitle>
        );
    }
}

// library image source: https://www.pexels.com/photo/library-university-books-students-12064/
