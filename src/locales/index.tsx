import intl from "react-intl-universal";

// the locales we support
// bad things happen when a non-existent locale is set here
export const supportedLocales = ["en", "de"];

/**
 * Returns a locale if it exists, or the default if it does not
 * @param locale Locale to get
 */
export function getLocaleOrFallback(locale: string): string {
    return (supportedLocales.indexOf(locale) === -1) ? supportedLocales[0] : locale;
}

let initedIntl = false; // flag keeping track if intl has been inited

/**
 * Initializes "react-intl" unless if has already been initalized
 */
export async function initLocaleSupport(): Promise<void> {
    // we already loaded supported, so we don't have to again
    if (initedIntl) return;
    initedIntl = true;

    // make sure to use a polyfill on the server
    if (!process.browser)
        global.Intl = await import("intl");

    // load all the needed locale-data
    // tslint:disable-next-line:no-require-imports no-submodule-imports
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
async function localLocaleData(locale: string): Promise<{[key: string]: string}> {
    // load all the components
    const data = await Promise.all(
        [
            "footer",
            "header",
            "actionheader",
            "library",
            "dictionary",
            "home",
        ]
        .map(component => import(`./${locale}/${component}.json`).then(x => x.default)),
    );

    // merge all the objects
    return data.reduce((p, c) => ({...p, ...c}));
}
