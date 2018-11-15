/**
 * Omits a key K from a type T
 */
export type Without<T, K> = Pick<T, Exclude<keyof T, K>>;