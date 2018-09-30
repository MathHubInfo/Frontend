import { default as Parser, DOMNode, IHTMLReactParserOptions } from "html-react-parser";
// tslint:disable-next-line:no-submodule-imports
import domToReact from "html-react-parser/lib/dom-to-react";
import * as React from "react";
import { Popup } from "semantic-ui-react";
import { HTML } from "../../context/api";

export class MathHTML extends React.Component<{ content: HTML, reference?: boolean }> {
    public render() {
        const { content } = this.props;
        const { reference } = this.props;
        if (reference) {
            const parserOptions: IHTMLReactParserOptions = {
                replace: (node: DOMNode) => {
                    if (node.type !== "tag") { return; }
                    const { attribs, children } = node;
                    if (!attribs) { return; }
                    if (node.name === "a") {
                        return (
                            <Popup
                                trigger={
                                    <a href={attribs.href}>
                                        {domToReact(children, parserOptions)}
                                    </a>}
                                content={<div>{attribs.href}</div>}
                            />
                        );
                    }
                    return;
                },
            };
            return (
                Parser(content, parserOptions)
            );
        }
        return (
            <div dangerouslySetInnerHTML={{ __html: content }} />
        );
    }
}
