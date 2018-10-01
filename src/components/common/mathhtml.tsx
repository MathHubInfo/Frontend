import { default as Parser, DOMNode, ReactElement } from "../../utils/react-html-parser";

import * as React from "react";
import { Popup } from "semantic-ui-react";
import { HTML } from "../../context/api";

export interface IMathHTMLProps {
    /** the html (string) that should be rendered */
    children: HTML;

    /** should we render references as html */
    reference?: boolean;

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
    }
    private replaceHTMLNodes(node: DOMNode, callback: (nodes: DOMNode[]) => ReactElement[]) {
        if (node.type !== "tag") { return; }

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
        return;
    }

    public render() {
        const { children: content, reference, as: asElement} = this.props;

        const children = Parser(content, reference ? {replace: this.replaceHTMLNodes} : {});
        return React.createElement(asElement || React.Fragment, { children });
    }
}
