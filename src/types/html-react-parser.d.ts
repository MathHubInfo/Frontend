//
// Type Definitions for html-react-parser
// from https://github.com/remarkablemark/html-react-parser
// version 0.4.7
//

declare module "html-react-parser" {
    // any react element
    export type ReactElement = React.ReactElement<any>;

    /**
     * Options for html-react-parser
     */
    export interface IHTMLReactParserOptions {
        /**
         * A function applied to each parsed dom node to generate a react element
         */
        replace?: (domNode: DOMNode) => ReactElement|null|undefined
    }

    //#region "DOM Node"
    export type DOMNode = DOMTextNode | DOMCommentNode | DOMTagNode;

    /** a DOM Node representing text */
    export interface DOMTextNode {
        type: 'text',
        /** the text contained in the DOM Node */
        data: string
    }
    
    /** a DOM Node representing comments */
    export interface DOMCommentNode {
        type: 'comment',
        /** the text of the comment including opening and closing tag */
        data: string
    }

    /** a DOM Node representing a tag */
    export interface DOMTagNode {
        type: 'tag',
        /** the name of the tag */
        name: string,
        /** the attributes of the tag */
        attribs: {[key: string]: string},
        /** the children of the node */
        children: DOMNode[]
    }
    //#endregion

    /**
     * Parses a string representing html into a single react element or list thereof
     * @param html html to parse
     * @param options options
     */
    export default function HTMLReactParser<T>(html: string, options?: IHTMLReactParserOptions): ReactElement | ReactElement[];
}

declare module "html-react-parser/lib/dom-to-react" {
    import {IHTMLReactParserOptions, DOMNode, ReactElement} from "html-react-parser";

    /**
     * Parses a string representing html into a single react element or list thereof
     * @param nodes parses nodes to convert
     * @param options options
     */
    export default function domToReact(nodes: DOMNode[], options?: IHTMLReactParserOptions) : ReactElement | ReactElement[];
}
