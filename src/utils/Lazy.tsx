/**
 * Returns a function of the same type as the original function.
 * It is only evaluated once, and then returns the cached value.
 * @param initializer Function to initialize data with
 */
export default function Lazy<T>(initializer: () => T): () => T {
    // holds the value iff it has been initialized
    let data: null | T = null;

    return () => {
        // if not initialized, initialize now
        if (data === null) data = initializer();

        // and return the data
        return data;
    };
}
