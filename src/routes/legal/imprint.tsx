import * as React from "react";

import { MonospaceContainer } from "../../components/common";
import { MHTitle } from "../../components/fragments";

import legalText from "../../../assets/content/imprint.txt";

export default function Imprint() {
    return (
        <MHTitle title="Imprint" autoCrumbs>
            <MonospaceContainer noTouch>{legalText}</MonospaceContainer>
        </MHTitle>
    );
}
