import * as React from "react";
import { Container, Header } from "semantic-ui-react";

import { Monospace } from "../../Components/Common";
import { MHText, MHTitle } from "../../Components/Fragments";
import { LoadWithSpinner } from "../../Components/Loaders";

export default class Licenses extends React.Component {
    render() {
        return (
            <LoadWithSpinner promise={Licenses.loadContent} title="LICENSE">{
                ([l, n]) => <LicensesDisplay license={l} notices={n} />}
            </LoadWithSpinner>
        );
    }

    private static readonly loadContent = async () => {
        return Promise.all([Licenses.getLicenseText(), Licenses.getNoticesText()]);
    }
    private static async getLicenseText() { return import("../../../LICENSE.txt").then(m => m.default); }
    private static async getNoticesText() {
        return import("axios")
            .then(a => a.default)
            .then(a => a.get<string>("NOTICES.txt", {responseType: "text"}))
            .then(r => r.data, e => "Unable to load NOTICES.txt, please navigate manually. ");
    }
}

function LicensesDisplay(props: {license: string; notices: string}) {
    const {license, notices} = props;

    return (
        <MHTitle title="MathHub Licenses" autoCrumbs>
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
                <Monospace noTouch>{license}</Monospace>
            </Container>
            <br />
            <Container text>
                <Header as="h3">Used Software Licenses</Header>
                <Monospace noTouch>{notices}</Monospace>
            </Container>
        </MHTitle>
    );
}
