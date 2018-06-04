import * as React from "react";

import { Container, Divider, Image } from "semantic-ui-react";
import { LoadWithPromise } from "../components/common/lazy";
import { Nav } from "../components/common/nav";
import { MHTitle } from "../utils/title";

export class Home extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
        this.loadContent = this.loadContent.bind(this);
    }

    private getHomeText() { return import("../../HOME.txt").then((m) => m.default); }
    private loadContent() { return Promise.all([this.getHomeText()]); }

    public render() {
        return (
            <div>
                <LoadWithPromise promise={this.loadContent} title="HOME">{
                    ([h]) => <HomeDisplay content={h} />}
                </LoadWithPromise>
                <Divider />
                <Container as={Nav} to={`/content`}>
                    <Image
                                size={"medium"}
                                src={require("../../../assets/library.jpg")}
                                title="MathHub Libraries"
                                inline={true}
                    />
                </Container>
                <Container as={Nav} to={`/content`}>
                    MathHub Libraries
                </Container>
                <Container href={"https://github.com/MathHubInfo/Documentation/wiki/libraries"}>
                    provide groups of
                </Container>
                <Container href={"https://github.com/MathHubInfo/Documentation/wiki/math-archives"}>
                    archives
                </Container>
            </div>
        );
    }
}

class HomeDisplay extends React.Component<{content: string}> {
    public render() {
        const {content} = this.props;

        return (
            <MHTitle title="Home">
                <Container text>
                    <div dangerouslySetInnerHTML={{__html: content}}/>
                    </Container>
            </MHTitle>
        );
    }
}
// library image source: https://www.pexels.com/photo/library-university-books-students-12064/
