import * as React from "react";

import { IOpaqueProps } from "../../../../theming/Pages/Library/IOpaqueProps";

import MHHTML from "../../../../lib/components/MHHTML";

export default class Opaque extends React.Component<IOpaqueProps> {
    render() {
        return <MHHTML>{this.props.children.content}</MHHTML>;
    }
}
