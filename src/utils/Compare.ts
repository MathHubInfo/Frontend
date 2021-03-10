import * as React from "react";

/**
 * Compare compares two elements based on the names of their elements
 */
export default function Compare<T>(a: React.ReactElement<T>, b: React.ReactElement<T>): -1 | 1 | 0 {
    if (a.key === null || b.key === null) return 0;
    const first = (a.key as string).toUpperCase();
    const second = (b.key as string).toUpperCase();

    if (first < second) return -1;
    if (first > second) return 1;

    return 0;
}

export function CompareStrings(a: string, b: string): -1 | 1 | 0 {
    if (a === b) return 0;
    return a < b ? -1 : 1;
}
