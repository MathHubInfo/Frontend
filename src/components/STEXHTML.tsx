import * as React from "react";
import MHHTML from "./MHHTML";

interface ISTEXHTMLProps {
    // the html (string) that should be rendered
    children: string;
}

import { TNodeList, TReactElement } from "../utils/ReactHTMLParser";
import MHLink from "./MHLink";

const STEX_MODULE_URI_PREFIX = 'stex-module://';

/**
 * An element representing mathmatically relevant text based on html input
 */
export default class STEXHTML extends React.PureComponent<ISTEXHTMLProps> {
    render() {
        const { children } = this.props;
        return <MHHTML replaceNodes={this.replaceLinkNodes} renderMath={true}>{children}</MHHTML>
    }

    private readonly replaceLinkNodes = (node: Element, callback: (nodes: TNodeList) => TReactElement[]):  JSX.Element | undefined => {
        if (node.nodeName.toLowerCase() !== "a") return;
        
        // check that an href was generated
        const href = node.getAttribute("href");
        if(typeof href !== 'string') return;
        if(!href.startsWith(STEX_MODULE_URI_PREFIX)) return;

        // make a content uri for it!
        const id = `pseudo-tree://smglom-stex/${href.substring(STEX_MODULE_URI_PREFIX.length)}`;
        return <MHLink href="/library/document" query={{id}}><a>{callback(node.childNodes)}</a></MHLink>;
    }
}