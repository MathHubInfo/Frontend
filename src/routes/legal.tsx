import * as React from "react";

import { Container, Header } from "semantic-ui-react";
import { LoadWithPromise } from "../components/common/lazy";

export class Legal extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
        this.loadContent = this.loadContent.bind(this);
    }

    private getLicenseText() { return import("../../LICENSE.txt").then((m) => m.default); }
    private getNoticesText() {
        return import("axios")
            .then((a) => a.default)
            .then((a) => a.get<string>("NOTICES.txt", {responseType: "text"}))
            .then((r) => r.data, (e) => "Unable to load NOTICES.txt, please navigate manually. ");
    }
    private loadContent() { return Promise.all([this.getLicenseText(), this.getNoticesText()]); }

    public render() {
        return (
            <LoadWithPromise promise={this.loadContent} title="LICENSE">{
                ([l, n]) => <LegalDisplay license={l} notices={n}/>}
            </LoadWithPromise>
        );
    }
}

class LegalDisplay extends React.Component<{license: string, notices: string}> {
    public render() {
        const {license, notices} = this.props;

        return (
            <div>
                <Container text>
                    <Header as="h2">MathHub Legal</Header>
                    <div>
                        <p>
                            MathHub React Frontend has been developed at KWARC and is licensed under GPL 3.0.
                        </p>
                        <p>
                            Below you can find a copy of the GPL 3.0 License as well as licenses of all software used.
                        </p>
                    </div>
                </Container>
                <br />
                <Container text>
                    <Header as="h3">GPL 3.0 License Text</Header>
                    <LegalContainer text={license} />
                </Container>
                <br />
                <Container text>
                    <Header as="h3">Used Software Licenses</Header>
                    <LegalContainer text={notices} />
                </Container>
            </div>
        );
    }
}

class LegalContainer extends React.Component<{text: string}> {
    public render() {
        return (
            <div style={{fontFamily: "monospace"}}>{
                this.props.text.split("\n").map(
                    (l: string, i: number) => <span key={i}>{l}<br /></span>,
                )
            }
            </div>
        );
    }
}
