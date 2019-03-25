/**
 * Makes every property of a type required, if it is not already. 
 * Opposite of the {@link Partial} type
 */
declare type Mandatory<T> = T extends Partial<infer U> ? U : never;

/**
 * A version of T which has a string index signature
 */
declare type Indexable<T> = {[key: string]: ValueOf[T]}

/**
 * Type of all values of T
 */
declare type ValueOf<T> = T[keyof T];

/**
 * A stricter version of the object constructor
 */
declare interface ObjectConstructor {
    keys<T>(object: T): Array<keyof T>;
}

/**
 * for literal unions
 * @example Sub<'Y' | 'X', 'X'> // === 'Y'
 */
type Sub<
    O extends string,
    D extends string
    > = {[K in O]: (Record<D, never> & Record<string, K>)[K]}[O]

/**
 * Remove the keys represented by the string union type D from the object type O.
 *
 * @example Omit<{a: number, b: string}, 'a'> // === {b: string}
 * @example Omit<{a: number, b: string}, keyof {a: number}> // === {b: string}
 */
export type Omit<O, D extends string> = Pick<O, Sub<keyof O, D>>

/**
 * Remove the keys of type T from type S
 */
export type Without<T, S> = Omit<T, keyof S>