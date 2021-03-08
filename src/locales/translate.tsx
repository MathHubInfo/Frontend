import { LocaleData } from ".";
import { interpolate } from "../utils/interpolate";

/** translate translates id with the provided vars given the provided locale data */
export function translate(localeData: LocaleData, id: string, vars?: Record<string, string>): string {
    const value = localeData[id];
    if (value === undefined) {
        throw new Error(`Missing translation for "${id}"`);
    }

    return interpolate(/\{([^\s\}]+)\}/g, value, vars ?? {});
}
