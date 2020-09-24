import * as React from "react";
import { IOpaqueElement } from "../../../context/LibraryClient/objects";
import MHHTML from "../../../components/MHHTML";

interface IOpaqueProps {
    children: IOpaqueElement;
}


export default class PageOpaque extends React.Component<IOpaqueProps> {
    render() {
        return <MHHTML>{this.props.children.content}</MHHTML>;
    }
}
