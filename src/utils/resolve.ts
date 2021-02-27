/** resolve resolves a URL relative to a base */
export function resolveURL(from: string, to: string): string {
    // this used to be possible with require("url").resolve
    // but that got deprecated!
    return new URL(to, from || undefined).href;
}
