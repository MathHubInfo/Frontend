/**
 * Omits a key K from a type T
 */
export type Without<T, K> = Pick<T, Exclude<keyof T, K>>;

/**
 * Gets the member-type of an array
 */
export type MemberType<T> = T extends (infer M)[] ? M : never;
