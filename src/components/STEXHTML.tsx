import * as React from "react";
import MHHTML from "./MHHTML";

interface ISTEXHTMLProps {
    // the html (string) that should be rendered
    children: string;

    // current language to link
    lang?: string;
}

import { TNodeList, TReactElement } from "../utils/ReactHTMLParser";
import MHLink from "./MHLink";

const STEX_MODULE_URI_PREFIX = "stex-module://";

/**
 * An element representing mathmatically relevant text based on html input
 */
export default class STEXHTML extends React.PureComponent<ISTEXHTMLProps> {
    render() {
        const { children } = this.props;

        return (
            <MHHTML replaceNodes={this.replaceLinkNodes} renderMath>
                {children}
            </MHHTML>
        );
    }

    private readonly replaceLinkNodes = (
        node: Element,
        callback: (nodes: TNodeList) => TReactElement[],
    ): JSX.Element | undefined => {
        if (node.nodeName.toLowerCase() !== "a") return undefined;

        // check that the <a> comes with an <href>
        const href = node.getAttribute("href");
        if (typeof href !== "string" || href == "") {
            // invalid link was found in source => make it bold
            // this is because of a bug in xhtml generation
            return <b>{callback(node.childNodes)}</b>;
        }
        if (!href.startsWith(STEX_MODULE_URI_PREFIX)) return undefined;

        const { lang } = this.props;
        const suffix = lang ? `/${lang}` : "";
        const id = `pseudo-tree://smglom-stex/${href.substring(STEX_MODULE_URI_PREFIX.length)}${suffix}`;

        return (
            <MHLink href={{ kind: "document", id }}>
                <a>{callback(node.childNodes)}</a>
            </MHLink>
        );
    };
}
