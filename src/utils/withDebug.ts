/**
 * A function to log for debugging purposes
 */
export function withDebug<T>(f: () => T, ...messages: string[]): () => T {
    if (process.env.NODE_ENV === "production") return f;

    return () => {
        debugLog(...messages);

        return f();
    };
}

// tslint:disable-next-line: no-any
export function debugLog(...messages: any[]): void {
    if (process.env.NODE_ENV !== "production")
        // tslint:disable-next-line: no-console
        console.log(...messages);
}
