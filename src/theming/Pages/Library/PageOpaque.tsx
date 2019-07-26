import * as React from "react";
import MHHTML from "../../../lib/components/MHHTML";
import { IOpaqueProps } from "./IOpaqueProps";

export default class PageOpaque extends React.Component<IOpaqueProps> {
    render() {
        return <MHHTML>{this.props.children.content}</MHHTML>;
    }
}
