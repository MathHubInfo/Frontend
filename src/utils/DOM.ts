import { DOMParser, XMLSerializer } from "xmldom";

const parser = new DOMParser();

/**
 * Parses a string containing html into a list of nodes
 * @param code String containing html
 */
export function ParseHTML(code: string): NodeListOf<Node> {
    // parse a new html document from a string
    const newDocument = parser.parseFromString(`<div>${code}</div>`, "text/html") as HTMLDocument;

    // we check if thhe document was parsed correctly by checking that the first child is a <div>
    // if this is not the case we did not have valid {code} and instead return an empty nodelist
    if (newDocument.childNodes.length !== 1 || newDocument.childNodes[0].nodeName.toLowerCase() !== "div")
        return parser.parseFromString("<div />", "text/html").childNodes[0].childNodes;

    // if valid, return the document as is
    return newDocument.childNodes[0].childNodes;
}

const serializer = new XMLSerializer();

/**
 * Gets the outer html for a node
 * @param node Node to get outer html from
 */
export function OuterHTML(node: Node): string {
    return serializer.serializeToString(node);
}

const d = parser.parseFromString("<div />", "text/html");
export const ATTRIBUTE_NODE = d.ATTRIBUTE_NODE;
export const CDATA_SECTION_NODE = d.CDATA_SECTION_NODE;
export const COMMENT_NODE = d.COMMENT_NODE;
export const DOCUMENT_FRAGMENT_NODE = d.DOCUMENT_FRAGMENT_NODE;
export const DOCUMENT_NODE = d.DOCUMENT_NODE;
export const DOCUMENT_POSITION_CONTAINED_BY = d.DOCUMENT_POSITION_CONTAINED_BY;
export const DOCUMENT_POSITION_CONTAINS = d.DOCUMENT_POSITION_CONTAINS;
export const DOCUMENT_POSITION_DISCONNECTED = d.DOCUMENT_POSITION_DISCONNECTED;
export const DOCUMENT_POSITION_FOLLOWING = d.DOCUMENT_POSITION_FOLLOWING;
export const DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = d.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
export const DOCUMENT_POSITION_PRECEDING = d.DOCUMENT_POSITION_PRECEDING;
export const DOCUMENT_TYPE_NODE = d.DOCUMENT_TYPE_NODE;
export const ELEMENT_NODE = d.ELEMENT_NODE;
export const ENTITY_NODE = d.ENTITY_NODE;
export const ENTITY_REFERENCE_NODE = d.ENTITY_REFERENCE_NODE;
export const NOTATION_NODE = d.NOTATION_NODE;
export const PROCESSING_INSTRUCTION_NODE = d.PROCESSING_INSTRUCTION_NODE;
export const TEXT_NODE = d.TEXT_NODE;
