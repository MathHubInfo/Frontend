import * as React from "react";

import { default as Parser, TNodeList, TReactElement } from "../utils/ReactHTMLParser";

import { ELEMENT_NODE, OuterHTML } from "../utils/DOM";

interface IMathHTMLProps<T> {
    // the html (string) that should be rendered
    children: string;

    // optional function to replace nodes in the html
    replaceNodes?: (node: Element, callback: (nodes: TNodeList) => TReactElement[]) =>  JSX.Element | undefined

    // should we render math, defaults to true
    renderMath?: boolean;

    // override the default type this element should appear as
    as?: T;

    // extra properties to give to the element being created
    // tslint:disable-next-line:no-any
    extra?: { [key: string]: any };
}

/**
 * An element representing mathmatically relevant text based on html input
 */
export default class MHHTML<S, T extends string | React.ComponentType<S> | React.FunctionComponent<S>>
    extends React.PureComponent<IMathHTMLProps<T>> {
    render() {
        const { children: content, as: asElement, extra} = this.props;

        const children = Parser(content, {replace: this.replaceHTMLNodes}).map(
            (child: React.ReactElement<{}>, index: number) => React.cloneElement(child, {key: index}),
        );

        return React.createElement(asElement || React.Fragment, (extra || {}) as S, ...children);
    }

    private readonly replaceHTMLNodes = (node: Node, callback: (nodes: TNodeList) => TReactElement[]): JSX.Element | undefined => {
        if (node.nodeType !== ELEMENT_NODE) return undefined;

        const {renderMath, replaceNodes} = this.props;

        if (renderMath !== false) {
            const mathReplaced = this.replaceMathNode(node as Element, callback);
            if (mathReplaced) return mathReplaced;
        }

        if (typeof replaceNodes === 'function') {
            const replaced = replaceNodes(node as Element, callback);
            if (replaced) return replaced;
        }

        return undefined;
    }

    private readonly replaceMathNode = (node: Element, _: (nodes: Node[]) => TReactElement[]) => {
        if (node.nodeName.toLowerCase() !== "math") return;

        return <RenderedMath>{OuterHTML(node)}</RenderedMath>;
    }
}

// renders a single math element
function RenderedMath(props: {children: string}) {
    // tslint:disable-next-line:react-no-dangerous-html
    return <span dangerouslySetInnerHTML={{__html: props.children}} />;
}
