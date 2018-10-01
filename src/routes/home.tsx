import * as React from "react";

import { Link } from "react-router-dom";

import { Button, Divider, Grid, Image } from "semantic-ui-react";

import { LoadWithSpinner } from "../components/common/lazy";
import { MathHTML } from "../components/common/mathhtml";
// import { Nav } from "../components/common/nav";

import { MHTitle } from "../utils/title";

import { encodeLibraryLink } from "./library";

export class Home extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
        this.loadContent = this.loadContent.bind(this);
    }

    private getHomeText() { return import("../../assets/content/HOME.txt").then((m) => m.default); }
    private loadContent() { return Promise.all([this.getHomeText()]); }

    public render() {
        return (
            <>
                <LoadWithSpinner promise={this.loadContent} title="HOME">{
                    ([h]) => <HomeDisplay content={h} />}
                </LoadWithSpinner>
                <Divider />
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
            </>
        );
    }
}

class HomeDisplay extends React.Component<{content: string}> {
    public render() {
        const {content} = this.props;

        return (
            <MHTitle title="Home"><MathHTML reference>{content}</MathHTML></MHTitle>
        );
    }
}
// library image source: https://www.pexels.com/photo/library-university-books-students-12064/
