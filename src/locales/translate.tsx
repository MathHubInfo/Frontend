import { LocaleData } from ".";

/** translate translates id with the provided vars given the provided locale data */
export function translate(localeData: LocaleData, id: string, vars?: Record<string, string>): string {
    const value = localeData[id];
    if (value === undefined) {
        throw new Error(`Missing translation for "${id}"`);
    }

    return substiute(value, vars);
}

/** substitute substitues vars into value */
function substiute(value: string, vars?: Record<string, string>): string {
    // TODO: This function is a hack at the moment!
    // This should be fixed using some underlying module!

    if (vars === undefined) return value;

    let result = value;
    Object.entries(vars).forEach(([key, value]) => {
        result = result.replace(`{${key}}`, value);
    });
    return result;
}
