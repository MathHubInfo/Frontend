import * as React from "react";

/**
 * Compare compares two elements based on the names of their elements
 */
export default function Compare<T>(a: React.ReactElement<T>, b: React.ReactElement<T>) {
    if (a.key === null || b.key === null)
        return 0;
    const first = (a.key as string).toUpperCase();
    const second = (b.key as string).toUpperCase();

    if (first  < second)
        return -1;
    if (first > second)
        return 1;

    return 0;
}
