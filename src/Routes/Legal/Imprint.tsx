import * as React from "react";

import { Monospace } from "../../Components/Common";
import { MHTitle } from "../../Components/Fragments";

import { default as imprintTxt } from "../../../assets/content/imprint.txt";

export default class Imprint extends React.Component {
    render() {
        return (
            <MHTitle title="Imprint" autoCrumbs>
                <Monospace noTouch>{imprintTxt}</Monospace>
            </MHTitle>
        );
    }
}
