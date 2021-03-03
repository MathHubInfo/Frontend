import { isLocale, Locale, LocaleData } from ".";

// TODO: Make an automatic manifest of some kind here!
const localeParts = ["footer", "header", "actionheader", "library", "dictionary", "home", "failure"] as const;

/**
 * Load all the locale data for the provided locale
 *
 * @param locale
 */
export async function loadLocaleData(locale: Locale): Promise<LocaleData> {
    if (!isLocale(locale)) {
        throw new Error(`Unknown locale ${locale}`);
    }

    // load all the components
    const data = await Promise.all(
        localeParts.map(component => import(`./data/${locale}/${component}.json`).then(x => x.default)),
    );

    // merge all the objects
    return data.reduce((p, c) => ({ ...p, ...c }));
}
