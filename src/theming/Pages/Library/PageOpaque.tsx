import * as React from "react";
import { IOpaqueElement } from "../../../context/LibraryClient/objects";
import MHHTML from "../../../components/MHHTML";
import STEXHTML from "../../../components/STEXHTML";

interface IOpaqueProps {
    children: IOpaqueElement;
}


export default class PageOpaque extends React.Component<IOpaqueProps> {
    render() {
        const {contentFormat, content} = this.props.children;
        switch(contentFormat) {
            case "html":
                return <MHHTML>{content}</MHHTML>;
            case "application/xhtml+stex":
                return <STEXHTML>{content}</STEXHTML>;
            default:
        }
        
        return <div>
            <b>{contentFormat}</b>
            <pre>{content}</pre>
        </div>
    }
}
