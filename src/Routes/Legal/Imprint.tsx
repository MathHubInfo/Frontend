import * as React from "react";
import { RouteComponentProps } from "react-router";

import { default as imprintTxt } from "../../../assets/content/imprint.txt";
import { Monospace } from "../../Components/Common";
import { MHTitle } from "../../Components/Fragments";

export default class Imprint extends React.Component<RouteComponentProps> {
    render() {
        return (
            <MHTitle title="Imprint" autoCrumbs>
                <Monospace noTouch>{imprintTxt}</Monospace>
            </MHTitle>
        );
    }
}
