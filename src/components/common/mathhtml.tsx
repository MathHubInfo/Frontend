import { default as Parser, DOMNode, DOMTagNode, domToString, ReactElement } from "../../utils/react-html-parser";

import * as React from "react";
import { Popup } from "semantic-ui-react";
import { HTML } from "../../context/api";

export interface IMathHTMLProps {
    /** the html (string) that should be rendered */
    children: HTML;

    /** should we render semantic references, false as default */
    renderReferences?: boolean;

    /** should we render math, defaults to true */
    renderMath?: boolean;

    /** override the default type this element should appear as */
    as?: any;
}

/**
 * An element representing mathmatically relevant text based on html input
 */
export class MathHTML extends React.Component<IMathHTMLProps> {
    constructor(props: IMathHTMLProps) {
        super(props);

        this.replaceHTMLNodes = this.replaceHTMLNodes.bind(this);
        this.replaceLinkNode = this.replaceLinkNode.bind(this);
        this.replaceMathNode = this.replaceMathNode.bind(this);
    }
    private replaceHTMLNodes(node: DOMNode, callback: (nodes: DOMNode[]) => ReactElement[]) {
        if (node.type !== "tag") { return; }

        const {renderReferences, renderMath} = this.props;

        if (renderReferences) {
            const linkReplaced = this.replaceLinkNode(node, callback);
            if (linkReplaced) { return linkReplaced; }
        }

        if (renderMath !== false) {
            const mathReplaced = this.replaceMathNode(node, callback);
            if (mathReplaced) { return mathReplaced; }
        }

        return;
    }

    private replaceLinkNode(node: DOMTagNode, callback: (nodes: DOMNode[]) => ReactElement[]) {
        const { attribs, children } = node;
        if (!attribs) { return; }
        if (node.name === "a") {
            return (
                <Popup
                    trigger={
                        <a href={attribs.href}>{callback(children)}</a>}
                    content={<div>{attribs.href}</div>}
                />
            );
        }
    }

    private replaceMathNode(node: DOMTagNode, callback: (nodes: DOMNode[]) => ReactElement[]) {
        if (node.name === "math") {
            return <RenderedMath>{domToString(node)}</RenderedMath>;
        }
    }

    public render() {
        const { children: content, as: asElement} = this.props;

        const children = Parser(content, {replace: this.replaceHTMLNodes}).map(
            (child: React.ReactElement<any>, index: number) => React.cloneElement(child, {key: index}),
        );
        return React.createElement(asElement || React.Fragment, { children });
    }
}

/** rendering a single math element */
export class RenderedMath extends React.Component<{children: string}, {renderedHTML: string}> {
    constructor(props: {children: string}) {
        super(props);
        this.state = this.generateState(props);
    }

    private generateState(props: {children: string}) {
        // TODO: MathML => HTML Polyfill
        // nothing that doesn't require us to load external scripts (at runtime) seems to do this
        return {renderedHTML: props.children};
    }

    public componentWillReceiveProps(nextProps: {children: string}) {
        if (nextProps.children !== this.props.children) {
            this.setState(this.generateState(nextProps));
        }
    }

    public render() {
        return <div dangerouslySetInnerHTML={{__html: this.state.renderedHTML}} />;
    }
}
