/**
 * Interpolate interpolates string variables in value.
 *
 * @param regex Regexp to match interpolated variables. The first group is assumed to contain the name of the value.
 * @param value String to interpolate values in
 * @param context Values to substiute values in for
 * @returns the interpolated value
 */
export function interpolate(regex: RegExp, value: string, context: Record<string, string>): string {
    return value.replaceAll(regex, (match: string, name: string) => {
        // check that the variable is defined in the context
        // if it is missing send out a warning and leave the string untouched
        if (!Object.prototype.hasOwnProperty.call(context, name)) {
            console.warn("Undefined variable", name, "in", value);
            return match;
        }
        return `${context[name]}`;
    });
}
