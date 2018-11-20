import * as React from "react";
import { Link } from "react-router-dom";

import { Button, Grid, Image } from "semantic-ui-react";

import { HTML, MHBreadCrumbs, MHText, MHTitle } from "../Components/Fragments";
import { LoadWithSpinner } from "../Components/Loaders";

import { encodeLibraryLink } from "./Library/Structure/Links";

// library image source: https://www.pexels.com/photo/library-university-books-students-12064/

export class Home extends React.Component {
    render() {
        // MHTitle can not use autocrumbs here
        // because Home is prepended to every one of them
        return (
            <MHTitle title="Home">
                <MHBreadCrumbs crumbs={[]} />
                <MHText>
                    <LoadWithSpinner promise={Home.loadContent} title="HOME">{
                        h => <HTML renderReferences children={h} />}
                    </LoadWithSpinner>
                </MHText>
                <Grid>
                    <Grid.Column width={10}>
                        <Link to={encodeLibraryLink()}>
                            <Image
                                // tslint:disable-next-line:no-require-imports
                                src={require("../../../assets/library.jpg")}
                                title="MathHub Libraries"
                                inline
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

    private static readonly loadContent = async () => {
        const HomeText = await import("../../assets/content/HOME.txt");

        return HomeText.default;
    }
}
