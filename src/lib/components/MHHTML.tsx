import * as React from "react";

import { default as Parser, TNodeList, TReactElement } from "../../utils/reactHTMLParser";

import { getDocumentConstants, outerHTML } from "../../utils/dom";

interface IMathHTMLProps<T> {
    // the html (string) that should be rendered */
    children: string;

    // should we render semantic references, false as default */
    renderReferences?: boolean;

    // should we render math, defaults to true */
    renderMath?: boolean;

    // override the default type this element should appear as */
    // tslint:disable-next-line:no-reserved-keywords
    as?: T;

    // extra properties to give to the element being created */
    // tslint:disable-next-line:no-reserved-keywords no-any
    extra?: { [key: string]: any };
}

/**
 * An element representing mathmatically relevant text based on html input
 */
export default class MHHTML<S, T extends string | React.ComponentClass<S> | React.FunctionComponent<S>>
    extends React.PureComponent<IMathHTMLProps<T>> {
    render() {
        const { children: content, as: asElement, extra} = this.props;

        const children = Parser(content, {replace: this.replaceHTMLNodes}).map(
            (child: React.ReactElement<{}>, index: number) => React.cloneElement(child, {key: index}),
        );

        return React.createElement(asElement || React.Fragment, (extra || {}) as S, ...children);
    }

    private readonly replaceHTMLNodes = (node: Node, callback: (nodes: TNodeList) => TReactElement[]) => {
        if (node.nodeType !== getDocumentConstants().ELEMENT_NODE) return undefined;

        const {renderMath} = this.props;

        /*if (renderReferences) {
            const linkReplaced = this.replaceLinkNode(node as Element, callback);
            if (linkReplaced) return linkReplaced;
        }*/

        if (renderMath !== false) {
            const mathReplaced = this.replaceMathNode(node as Element, callback);
            if (mathReplaced) return mathReplaced;
        }

        return undefined;
    }

    /*
    private readonly replaceLinkNode = (node: Element, callback: (nodes: TNodeList) => TReactElement[]) => {
        if (node.nodeName.toLowerCase() === "a") {
            const href = node.getAttribute("href") || "";

            return (
                <Popup
                    trigger={
                        <a href={href}>{callback(node.childNodes)}</a>}
                    content={<div>{href}</div>}
                />
            );
        }
    }*/

    private readonly replaceMathNode = (node: Element, _: (nodes: Node[]) => TReactElement[]) => {
        if (node.nodeName.toLowerCase() === "math")
            return <RenderedMath>{outerHTML(node)}</RenderedMath>;
    }
}

// renders a single math element
function RenderedMath(props: {children: string}) {
    // tslint:disable-next-line:react-no-dangerous-html
    return <span dangerouslySetInnerHTML={{__html: props.children}} />;
}
