/**
 * A function to create a lazy variable that is only fetched once
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

export function AsyncLazy<T>(initializer: () => Promise<T>): () => Promise<T> {
    // holds the value iff it has been initialized
    let data: null | T = null;

    // are we currently loading the data
    let loading = false;

    // callbacks that are waiting for the function to be completed
    const waiters: Array<(data: T | null, error: {}) => void> = [];

    /**
     * If data is loaded, resolves all waiters
     *
     * If data is not loaded and loading is not already in progress
     * starts loading the data and then resolves all waiters.
     */
    const loadingCycle = async () => {
        if (data !== null) return resolveWaiters(data, {});

        if (loading) return;
        loading = true;


        try {
            data = await initializer();
            resolveWaiters(data, {});
        } catch (e) {
            resolveWaiters(null, e);
        }

        loading = false;
    };

    /**
     * Syncronously resolves all waiters
     */
    const resolveWaiters = (d: T | null, e: {}) => {
        while (waiters.length > 0) {
            const waiter = waiters.pop();
            if (!waiter) break;
            setImmediate(() => waiter(d, e));
        }
    };

    return async () => {
        // create a promise to add to the waiters
        const promise = new Promise<T>((rs, rj) => waiters.push((d, e) => d === null ? rj(e) : rs(d)));

        // resolve all the waiters
        loadingCycle().catch(_ => null);

        // and return the value
        return promise;
    };
}
