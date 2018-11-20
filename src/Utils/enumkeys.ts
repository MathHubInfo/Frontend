/**
 * This file provides utilities to declare a finite type using an enum
 * and access it's names at runtime.
 *
 * Example:
 *
 * enum Languages { en, de, fr }
 * export type TKnownLanguages = EnumKeys<typeof Languages>; // "en" | "de" | "fr"
 * export const knownLanguages = getEnumKeys<typeof Languages>(Languages); // ["en", "de", "fr"]
 */

// type of keys of an Enum declaration
export type EnumKeys<T> = keyof T;

// return an array containing the keys of an enum type
export function getEnumKeys<T>(e: T): Array<EnumKeys<T>> {
    return Object.keys(e)
    .filter(s => isNaN(Number(s))) as Array<EnumKeys<T>>;
}
