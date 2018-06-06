import * as React from "react";

import { Link } from "react-router-dom";
import { encodeLink } from "./library";

import { Divider, Image } from "semantic-ui-react";
import { LoadWithPromise } from "../components/common/lazy";
// import { Nav } from "../components/common/nav";
import { MHTitle } from "../utils/title";

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
                <LoadWithPromise promise={this.loadContent} title="HOME">{
                    ([h]) => <HomeDisplay content={h} />}
                </LoadWithPromise>
                <Divider />
                <Link to={encodeLink()}>
                    <Image
                                size={"medium"}
                                src={require("../../../assets/library.jpg")}
                                title="MathHub Libraries"
                                inline={true}
                    />
                </Link>
                <Link to={encodeLink()}>
                    <br />MathHub Libraries
                </Link>
                <a href={"https://github.com/MathHubInfo/Documentation/wiki/libraries"}>
                    <br />provide groups of
                </a>
                <a href={"https://github.com/MathHubInfo/Documentation/wiki/math-archives"}>
                    <br />archives
                </a>
            </>
        );
    }
}

class HomeDisplay extends React.Component<{content: string}> {
    public render() {
        const {content} = this.props;

        return (
            <MHTitle title="Home">
                <>
                    <div dangerouslySetInnerHTML={{__html: content}}/>
                </>
            </MHTitle>
        );
    }
}
// library image source: https://www.pexels.com/photo/library-university-books-students-12064/
