import * as React from "react";
import MHHTML from "./MHHTML";

interface ISTEXHTMLProps {
    // the html (string) that should be rendered
    children: string;
}

/**
 * An element representing mathmatically relevant text based on html input
 */
export default class STEXHTML extends React.PureComponent<ISTEXHTMLProps> {
    render() {
        const { children } = this.props;
        return <MHHTML renderReferences={false} renderMath={true}>{children}</MHHTML>
    }
}