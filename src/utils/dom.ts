// tslint:disable:export-name
import { DOMParser } from "xmldom";

import Lazy from "./Lazy";

/**
 * Gets a DOMParser instance
 */
export const getParser = Lazy(() => new DOMParser());

/**
 * Parses a string containing html into a list of nodes
 * @param code String containing html
 */
export function parseHTMLString(code: string): NodeListOf<Node> {
    const dummyNode = getParser().parseFromString("<div />").childNodes[0] as Element;

    // tslint:disable-next-line: no-inner-html
    dummyNode.innerHTML = code;

    return dummyNode.childNodes;
}

/**
 * Gets the outer html for a node
 * @param node Node to get outer html from
 */
export function outerHTML(node: Node): string {
    const dummyNode = getParser().parseFromString("<div />").childNodes[0] as Element;
    dummyNode.appendChild(node);

    return dummyNode.innerHTML;
}

/**
 * Gets readonly constants stored within a document
 */
export const getDocumentConstants = Lazy(() => {
    const d = getParser().parseFromString("<div />", "text/html");

    return Object.freeze({
        ATTRIBUTE_NODE: d.ATTRIBUTE_NODE,
        CDATA_SECTION_NODE: d.CDATA_SECTION_NODE,
        COMMENT_NODE: d.COMMENT_NODE,
        DOCUMENT_FRAGMENT_NODE: d.DOCUMENT_FRAGMENT_NODE,
        DOCUMENT_NODE: d.DOCUMENT_NODE,
        DOCUMENT_POSITION_CONTAINED_BY: d.DOCUMENT_POSITION_CONTAINED_BY,
        DOCUMENT_POSITION_CONTAINS: d.DOCUMENT_POSITION_CONTAINS,
        DOCUMENT_POSITION_DISCONNECTED: d.DOCUMENT_POSITION_DISCONNECTED,
        DOCUMENT_POSITION_FOLLOWING: d.DOCUMENT_POSITION_FOLLOWING,
        DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: d.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC,
        DOCUMENT_POSITION_PRECEDING: d.DOCUMENT_POSITION_PRECEDING,
        DOCUMENT_TYPE_NODE: d.DOCUMENT_TYPE_NODE,
        ELEMENT_NODE: d.ELEMENT_NODE,
        ENTITY_NODE: d.ENTITY_NODE,
        ENTITY_REFERENCE_NODE: d.ENTITY_REFERENCE_NODE,
        NOTATION_NODE: d.NOTATION_NODE,
        PROCESSING_INSTRUCTION_NODE: d.PROCESSING_INSTRUCTION_NODE,
        TEXT_NODE: d.TEXT_NODE,
    });
});
