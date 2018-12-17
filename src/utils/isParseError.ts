import { DOMParser } from "xmldom";

/**
 * @license
 *
 * Adapted from code written by cspotcode
 * See https://stackoverflow.com/a/11623204
 */

/**
 * Checks if a DOMParser returned an error or not
 * @param parsedDocument Document to check for parsing errors
 */
export default function isParseError(parsedDocument: Document) {
    if (isParseError.parsererrorNS === null) {
        const parser = new DOMParser();
        const errorneousParse = parser.parseFromString("<", "text/xml");
        isParseError.parsererrorNS = errorneousParse.getElementsByTagName("parsererror")[0].namespaceURI;
    }

    // tslint:disable-next-line:no-http-string
    if (isParseError.parsererrorNS === "http://www.w3.org/1999/xhtml")
        // In PhantomJS the parseerror element doesn't seem to have a special namespace, so we are just guessing here :(
        return parsedDocument.getElementsByTagName("parsererror").length > 0;

    return parsedDocument.getElementsByTagNameNS(isParseError.parsererrorNS as string, "parsererror").length > 0;
}

isParseError.parsererrorNS = null as string | null ;
