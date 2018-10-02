/**
 * a custom utility module to parse a string into a set of react dom elements
 */
import * as React from "react";

/** any kind of react element */
export type TReactElement = React.ReactElement<any>;

/** a collection of nodes */
export type TNodeList = Node[] | NodeListOf<Node> | NodeList;

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
    replace?: (
        domNode: Node,
        callback: (nodes: TNodeList) => TReactElement[],
    ) => TReactElement | null | undefined;
}

/**
 * Parses a string into a set of React Elements
 * @param html String of html to parse
 * @param options Options to use during parsing
 */
export default function Parse(html: string, options?: IHTMLReactParserOptions): TReactElement[] {
    // create a temporary element
    const element = document.createElement("div");
    element.innerHTML = html;

    // and create a fragment with all those children
    const fragment = document.createDocumentFragment();
    nodeList2Array(element.childNodes).forEach((node: Node) => fragment.appendChild(node));

    // and parse the fragment
    return parseNodes(
        fragment.childNodes,
        options || {},
    );
}

export function parseNodes(
    nodes: TNodeList, options: IHTMLReactParserOptions, keyPrefix?: string,
): TReactElement[] {
    const results =
        nodeList2Array(nodes)
        .map((node, index) => handleNode(node, (keyPrefix || "") + index.toString(), options));
    return results.filter((node) => !!node) as TReactElement[];
}

function handleNode(node: Node, key: string, options: IHTMLReactParserOptions): TReactElement | null {
    // call the hook if we have one
    if (options && options.replace) {
        const replacement = options.replace(
            node,
            (nodes: TNodeList) => parseNodes(nodes, options, key + "_"),
        );
        if (replacement) { return replacement; }
    }

    // else switch by type of node
    if (node.nodeType === Node.ELEMENT_NODE) {
        return handleElement(node as Element, key, options);
    } else if (node.nodeType === Node.TEXT_NODE) {
        return handleText(node as Text, key, options);
    } else {
        return null;
    }
}

/** handles converting a normal html element to a react node */
function handleElement(element: Element, key: string, options: IHTMLReactParserOptions): TReactElement | null {
    // parse all the children
    const children = parseNodes(element.childNodes, options, key + "_");

    // handle all the attributes
    const attributes = handleAttributes(element);
    attributes.key = key;

    // and create the element
    return React.createElement(element.tagName.toLowerCase(), attributes, ...children);
}

function handleAttributes(element: Element): { [name: string]: any } {
    // bail out if the element has no attributes
    if (!element.hasAttributes()) {
        return {};
    }

    // create a dictonary
    const attribs = element.attributes;
    let attribName: string;
    let attribValue: any;

    // and create an attribute dictonary
    const theAttributes: {[name: string]: any} = {};

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < attribs.length; i++) {

        // get the name of the attribute if we know it
        attribName = attribs[i].name.toLowerCase();
        attribName = REACT_KNOWN_ATTRIBUTES[attribName] || attribName;

        // parse out the value if we know it
        attribValue = attribs[i].value;
        if (attribName === "style") {
            attribValue = handleStyleAttribute(attribValue);
        } else if (REACT_BOOLEAN_ATTRIBUTES.indexOf(attribName) !== -1) {
            attribValue = true;
        }

        // and set the property
        theAttributes[attribName] = attribValue;
    }

    // and return it
    return theAttributes;
}

/** handles converting the style attribute to a proper react value */
function handleStyleAttribute(styleString: string) {
    return styleString.split(";")
    .reduce(
        (styleObject: {[key: string]: string}, stylePropertyValue) => {
            // extract the style property name and value
            // tslint:disable-next-line:prefer-const
            let [property, value] = stylePropertyValue
                .split(/^([^:]+):/)
                .filter((val, i) => i > 0)
                .map((item: string) => item.trim().toLowerCase());

            // if there is no value (i.e. no : in the style) then ignore it
            if (value === undefined) {
                return styleObject;
            }

            // convert the property name into the correct React format
            // remove all hyphens and convert the letter immediately after each hyphen to upper case
            // additionally don't uppercase any -ms- prefix
            // e.g. -ms-style-property = msStyleProperty
            //      -webkit-style-property = WebkitStyleProperty
            property = property
                .replace(/^-ms-/, "ms-")
                .replace(/-(.)/g, (_, character) => character.toUpperCase());

            // add the new style property and value to the style object
            styleObject[property] = value;

            return styleObject;

        },
        {},
    );
}

// #region "Attribute lists"
// List of react attributes that change their name
const REACT_KNOWN_ATTRIBUTES: {[key: string]: string} = {
   /**
    * Standard Properties
    */
  "accept": "accept",
  "accept-charset": "acceptCharset",
  "accesskey": "accessKey",
  "action": "action",
  "allowfullscreen": "allowFullScreen",
  "allowtransparency": "allowTransparency",
  "alt": "alt",
  "as": "as",
  "async": "async",
  "autocomplete": "autoComplete",
  "autoplay": "autoPlay",
  "capture": "capture",
  "cellpadding": "cellPadding",
  "cellspacing": "cellSpacing",
  "charset": "charSet",
  "challenge": "challenge",
  "checked": "checked",
  "cite": "cite",
  "classid": "classID",
  "class": "className",
  "cols": "cols",
  "colspan": "colSpan",
  "content": "content",
  "contenteditable": "contentEditable",
  "contextmenu": "contextMenu",
  "controls": "controls",
  "controlsList": "controlsList",
  "coords": "coords",
  "crossorigin": "crossOrigin",
  "data": "data",
  "datetime": "dateTime",
  "default": "default",
  "defer": "defer",
  "dir": "dir",
  "disabled": "disabled",
  "download": "download",
  "draggable": "draggable",
  "enctype": "encType",
  "form": "form",
  "formaction": "formAction",
  "formenctype": "formEncType",
  "formmethod": "formMethod",
  "formnovalidate": "formNoValidate",
  "formtarget": "formTarget",
  "frameborder": "frameBorder",
  "headers": "headers",
  "height": "height",
  "hidden": "hidden",
  "high": "high",
  "href": "href",
  "hreflang": "hrefLang",
  "for": "htmlFor",
  "http-equiv": "httpEquiv",
  "icon": "icon",
  "id": "id",
  "inputmode": "inputMode",
  "integrity": "integrity",
  "is": "is",
  "keyparams": "keyParams",
  "keytype": "keyType",
  "kind": "kind",
  "label": "label",
  "lang": "lang",
  "list": "list",
  "loop": "loop",
  "low": "low",
  "manifest": "manifest",
  "marginheight": "marginHeight",
  "marginwidth": "marginWidth",
  "max": "max",
  "maxlength": "maxLength",
  "media": "media",
  "mediagroup": "mediaGroup",
  "method": "method",
  "min": "min",
  "minlength": "minLength",
  "multiple": "multiple",
  "muted": "muted",
  "name": "name",
  "nonce": "nonce",
  "novalidate": "noValidate",
  "open": "open",
  "optimum": "optimum",
  "pattern": "pattern",
  "placeholder": "placeholder",
  "playsinline": "playsInline",
  "poster": "poster",
  "preload": "preload",
  "profile": "profile",
  "radiogroup": "radioGroup",
  "readonly": "readOnly",
  "referrerpolicy": "referrerPolicy",
  "rel": "rel",
  "required": "required",
  "reversed": "reversed",
  "role": "role",
  "rows": "rows",
  "rowspan": "rowSpan",
  "sandbox": "sandbox",
  "scope": "scope",
  "scoped": "scoped",
  "scrolling": "scrolling",
  "seamless": "seamless",
  "selected": "selected",
  "shape": "shape",
  "size": "size",
  "sizes": "sizes",
  "slot": "slot",
  "span": "span",
  "spellcheck": "spellCheck",
  "src": "src",
  "srcdoc": "srcDoc",
  "srclang": "srcLang",
  "srcset": "srcSet",
  "start": "start",
  "step": "step",
  "style": "style",
  "summary": "summary",
  "tabindex": "tabIndex",
  "target": "target",
  "title": "title",
  "type": "type",
  "usemap": "useMap",
  "value": "value",
  "width": "width",
  "wmode": "wmode",
  "wrap": "wrap",
  /**
   * RDFa Properties
   */
  "about": "about",
  "datatype": "datatype",
  "inlist": "inlist",
  "prefix": "prefix",
  "property": "property",
  "resource": "resource",
  "typeof": "typeof",
  "vocab": "vocab",
  /**
   * Non-standard Properties
   */
  "autocapitalize": "autoCapitalize",
  "autocorrect": "autoCorrect",
  "autosave": "autoSave",
  "color": "color",
  "itemprop": "itemProp",
  "itemscope": "itemScope",
  "itemtype": "itemType",
  "itemid": "itemID",
  "itemref": "itemRef",
  "results": "results",
  "security": "security",
  "unselectable": "unselectable",
};

// List of boolean attributes in react
const REACT_BOOLEAN_ATTRIBUTES = [
    "allowfullScreen",
    "async",
    "autoplay",
    "capture",
    "checked",
    "controls",
    "default",
    "defer",
    "disabled",
    "formnovalidate",
    "hidden",
    "loop",
    "multiple",
    "muted",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "scoped",
    "seamless",
    "selected",
    "itemscope",
];

// #endregion

/** handles converting a text node to a react element */
function handleText(text: Text, key: string, options: IHTMLReactParserOptions): TReactElement | null {
    return <React.Fragment key={key}>{text.nodeValue}</React.Fragment>;
}

/** turns a NodeList into an array of nodes */
function nodeList2Array(nodeList: TNodeList): Node[] {
    const nodes: Node[] = new Array();

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < nodeList.length; i++) {
        nodes.push(nodeList[i]);
    }
    return nodes;
}

/**
 * part of this code in this file has been adapted from the html-react-parser module which is licensed as follows:
 *
 * The MIT License (MIT)
 * Copyright (c) 2016-present Peter Newnham
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject
 * to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
