/** a wrapper around html-react-parser that provides some more convenience */

import * as React from "react";

import { default as IParser, DOMNode, IHTMLReactParserOptions as IOptions } from "html-react-parser";
export {DOMNode, DOMTagNode} from "html-react-parser";

// tslint:disable-next-line:no-submodule-imports
import domToReact from "html-react-parser/lib/dom-to-react";
export type ReactElement = React.ReactElement<any>;

/**
 * Options to be passed to IHTMLReactParserOptions
 */
export interface IHTMLReactParserOptions {
    /**
     * An optional function to call over each domnode.
     *
     * @param domNode node to iterate over
     * @param callback a callback function to allow recursive iteration over nodes
     */
    replace?: (domNode: DOMNode, callback: (nodes: DOMNode[]) => ReactElement[]) => ReactElement | null | undefined;
}

/** turns a dom node into an actual Document */
function domToNode(dom: DOMNode): Node {
    if (dom.type === "comment") {
        return document.createComment(dom.data);
    } else if (dom.type === "text") {
        return document.createTextNode(dom.data);
    } else {
        // create the element
        const element = document.createElement(dom.name);

        // set all the attributes
        Object.keys(dom.attribs).forEach((key: string) =>
            element.setAttribute(key, dom.attribs[key]));

        // add the children
        dom.children.forEach((child: DOMNode) =>
            element.appendChild(domToNode(child)));

        return element;
    }
}

/** turns a dom node into an (approximate) string */
export function domToString(dom: DOMNode): string {
    const theDiv = document.createElement("div");
    theDiv.appendChild(domToNode(dom));
    return theDiv.innerHTML;
}

/**
 * Parses a string into a set of React Elements
 * @param html String of html to parse
 * @param options Options to use during parsing
 */
export default function Parse(html: string, options?: IHTMLReactParserOptions): ReactElement[] {
    let theOptions: IOptions;

    // if we have a replace function, we need to make sure all the parameters get passed
    if (options && options.replace) {
        theOptions = {
            replace: (domNode: DOMNode) => options.replace!(domNode, (nodes: DOMNode[]) => {
                const elements = domToReact(nodes, theOptions);
                return Array.isArray(elements) ? elements : [elements];
            }),
        };
    } else {
        theOptions = {};
    }

    // call the internal parser implementation
    const results = IParser(html, theOptions);
    return Array.isArray(results) ? results : [results];
}
