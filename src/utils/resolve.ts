/** resolve resolves a URL relative to a base */
export function resolveURL(from: string, to: string): string {
    // try resolving the 'from' url relative to the current location.
    // when that doesn't work, don't use a base url!
    let base: URL | undefined;
    try {
        base = new URL(from, process.browser ? location.href : undefined);
    } catch (e) {
        base = undefined;
    }

    // parse the actual URL, and when that fails, return an error
    try {
        return new URL(to, base).href;
    } catch (e) {
        return to;
    }
}
