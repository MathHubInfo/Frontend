/**
 * Flattens an array of depth 2
 * @param array array of depth 2 to flatten
 */
export default function flatten<T>(array: T[][]): T[] {
    return ([] as T[]).concat(...array);
}
