/**
 * A function to log for debugging purposes
 */
export function WithDebug<T>(f: () => T, ...messages: string[]): () => T {
    if (process.env.NODE_ENV === "production") return f;

    return () => {
        DebugLog(...messages);

        return f();
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DebugLog(...messages: any[]): void {
    if (process.env.NODE_ENV === "production") return;

    console.log(...messages);
}
