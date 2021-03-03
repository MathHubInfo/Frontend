// This file contains a very barebones implementation of i18n
// It works on the server and client side and only requires asyncronous code to load the translations of a new language

import locales from "./data/manifest.json";

export type Locale = "en" | "de";
export const supportedLocales = Object.freeze(locales as Array<Locale>);

// the default locale
export const defaultLocale: Locale = supportedLocales[0];

/** check if s is a valid locale */
export function isLocale(s: unknown): s is Locale {
    if (typeof s !== "string") return false;
    return (supportedLocales as Readonly<Array<string>>).indexOf(s) !== -1;
}

/** if s is a valid locale, return it. Else return undefined */
export function makeLocale(s: string | undefined): Locale | undefined {
    return isLocale(s) ? s : undefined;
}

export type LocaleData = Record<string, string>;
