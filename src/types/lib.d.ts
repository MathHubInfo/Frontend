/**
 * A version of T which has a string index signature
 */
export type Indexable<T> = { [key: string]: ValueOf[T] };
