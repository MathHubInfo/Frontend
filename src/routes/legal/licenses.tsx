import * as React from "react";

import { MonospaceContainer } from "../../components/common";
import { MHText, MHTitle } from "../../components/fragments";
import { LoadWithSpinner } from "../../components/loaders";

import { Container, Header } from "semantic-ui-react";

export default class Licenses extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
        this.loadContent = this.loadContent.bind(this);
    }

    private getLicenseText() { return import("../../../LICENSE.txt").then((m) => m.default); }
    private getNoticesText() {
        return import("axios")
            .then((a) => a.default)
            .then((a) => a.get<string>("NOTICES.txt", {responseType: "text"}))
            .then((r) => r.data, (e) => "Unable to load NOTICES.txt, please navigate manually. ");
    }
    private loadContent() { return Promise.all([this.getLicenseText(), this.getNoticesText()]); }

    public render() {
        return (
            <LoadWithSpinner promise={this.loadContent} title="LICENSE">{
                ([l, n]) => <LicensesDisplay license={l} notices={n}/>}
            </LoadWithSpinner>
        );
    }
}

function LicensesDisplay(props: {license: string, notices: string}) {
    const {license, notices} = props;

    return (
        <MHTitle title="MathHub Licenses">
            <MHText>
                <div>
                    <p>
                        MathHub React Frontend has been developed
                        at KWARC and is licensed under AGPL 3.0.
                    </p>
                    <p>
                        Below you can find a copy of the AGPL 3.0 License
                        as well as licenses of all software used.
                    </p>
                </div>
            </MHText>
            <Container text>
                <Header as="h3">GPL 3.0 License Text</Header>
                <MonospaceContainer noTouch>{license}</MonospaceContainer>
            </Container>
            <br />
            <Container text>
                <Header as="h3">Used Software Licenses</Header>
                <MonospaceContainer noTouch>{notices}</MonospaceContainer>
            </Container>
        </MHTitle>
    );
}
