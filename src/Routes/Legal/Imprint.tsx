import * as React from "react";

import { default as imprintTxt } from "../../../assets/content/imprint.txt";
import { Monospace } from "../../Components/Common";
import { MHTitle } from "../../Components/Fragments";
import { IRouteComponentProps } from "../../Routing/makeRouteComponent";

export default class Imprint extends React.Component<IRouteComponentProps> {
    render() {
        return (
            <MHTitle title="Imprint" autoCrumbs>
                <Monospace noTouch>{imprintTxt}</Monospace>
            </MHTitle>
        );
    }
}
