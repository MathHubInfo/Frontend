import intl from "react-intl-universal";
import { NextPageContext } from "next";

// the locales we support
// bad things happen when a non-existent locale is set here
export const supportedLocales = ["en", "de"];

/**
 * Negotiates the language from the user
 * @param context Context to negotiate language from
 * @returns the negotiated language
 */
export function negotiateLanguage(context: NextPageContext, surpressHeader = false): string {
    const language = getLocaleOrFallback(getSelectedLocale(context));
    if (context.res && !surpressHeader) context.res.setHeader("Content-Language", language);

    return language;
}

/**
 * Returns a locale if it exists, or the default if it does not
 * @param locale Locale to get
 */
function getLocaleOrFallback(locale: string): string {
    const theLocale = (locale.match(/^\s*[aA-zZ]{2}/g) || [""])[0].trim().toLowerCase();

    return supportedLocales.indexOf(theLocale) === -1 ? supportedLocales[0] : theLocale;
}

/**
 * Reads the prefered locale from the user
 */
function getSelectedLocale(context: NextPageContext): string {
    // if we have a 'lang' key in the request
    // we should use that where possible
    if (context.query && context.query.lang) {
        const queryLang = context.query.lang;
        if (typeof queryLang === "string") return queryLang;
        else return queryLang[0];
    }

    // if we have navigator.languages or navigator.language, use those
    if (process.browser) {
        if (navigator && navigator.languages) return navigator.languages[0];
        if (navigator && navigator.language) return navigator.language;
    }

    // our last alternative is the 'Accept-Language' header
    // read the header and make sure that it exists
    if (!context.req) return "";
    const acceptLanguage = context.req.headers["accept-language"] || ([] as string[]);
    if (!acceptLanguage) return "";

    // join all the headers by a '-'
    return parseLanguageHeader(typeof acceptLanguage === "string" ? acceptLanguage : acceptLanguage.join(","));
}

/**
 * Parses a language header
 * @param header Header to parse
 */
function parseLanguageHeader(header: string): string {
    let bits = header.split(",").map(e => {
        const pair = e.split(";");
        if (pair.length === 0) return ["", 0];

        return [
            (pair[0].match(/^\s*[aA-zZ]{2}/g) || [""])[0].trim().toLowerCase(),
            pair.length > 1 ? parseFloat(pair[1].split("=")[1]) : 1,
        ];
    }) as Array<[string, number]>;

    // filter out things that aren't known
    bits = bits.filter(e => e[0] === "*" || supportedLocales.indexOf(e[0]) !== -1);
    bits.sort((a, b) => b[1] - a[1]);

    // and return the highest priority one
    return bits.length > 0 ? bits[0][0] : "";
}

let initedIntl = false; // flag keeping track if intl has been inited

/**
 * Initializes "react-intl" unless if has already been initalized
 */
export async function initLocaleSupport(): Promise<void> {
    // we already loaded supported, so we don't have to again
    if (initedIntl) return;
    initedIntl = true;

    // if we have a 'global' we do not need to call any polyfills
    if (global.Intl) return;

    global.Intl = await import("intl");

    // load all the needed locale-data

    await Promise.all(supportedLocales.map(locale => import(`intl/locale-data/jsonp/${locale}.js`)));

    return;
}

/**
 * Loads data for the current locale
 * @param locale Name of locale to load
 */
export async function setLocale(locale: string): Promise<string> {
    const theLocale = getLocaleOrFallback(locale);
    if (intl.getInitOptions().currentLocale === locale) return theLocale;

    await intl.init({
        currentLocale: theLocale,
        locales: {
            [locale]: await localLocaleData(theLocale),
        },
    });

    return theLocale;
}

/**
 * Loads location data for the given locale
 * @param locale Name of locale to use. Assumed to be safe.
 */
async function localLocaleData(locale: string): Promise<Record<string, string>> {
    // load all the components
    const data = await Promise.all(
        ["footer", "header", "actionheader", "library", "dictionary", "home", "failure"].map(component =>
            import(`./${locale}/${component}.json`).then(x => x.default),
        ),
    );

    // merge all the objects
    return data.reduce((p, c) => ({ ...p, ...c }));
}
