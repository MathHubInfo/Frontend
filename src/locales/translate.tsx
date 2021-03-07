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
    const context = vars ?? {};
    return value.replaceAll(/\{([^\s\}]+)\}/g, (match: string, name: string) => {
        // check that the variable is defined in the context
        // if it is missing send out a warning and leave the string untouched
        if (!Object.prototype.hasOwnProperty.call(context, name)) {
            console.warn("Undefined variable", name, "in", value);
            return match;
        }
        return `${context[name]}`;
    });
}
