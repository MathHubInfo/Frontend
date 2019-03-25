/**
 * Creates a new record from a set of keys and a value function
 */
export function createRecord<K extends string | number, V>(keys: K[], value: (key: K) => V) {
    const record: Partial<Record<K, V>> = {};
    keys.forEach(k => record[k] = value(k));

    return record as Record<K, V>;
}
