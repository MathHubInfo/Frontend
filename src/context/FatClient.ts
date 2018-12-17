import HTTPClient from "./HTTPClient";

/**
 * A client that loads an entire dataset using a single GET request
 */
export default abstract class FatClient<T> {
    constructor(private readonly CLIENT_URL: string | undefined, private readonly client: HTTPClient) {}

    private cache: T[] | undefined;

    async loadAll(): Promise<T[]> {
        // if we have a cached result, return it
        if (this.cache !== undefined) return this.cache;

        // else we need to load and fill the cache
        this.cache = await this.loadAllInternal();

        return this.cache;
    }

    // loads the mocked dataset
    protected abstract async mock(): Promise<T[]>;

    // internal function to load all urls and store them
    private async loadAllInternal(): Promise<T[]> {
        return (this.CLIENT_URL === "" || this.CLIENT_URL === undefined) ? this.mock() : this.rest();
    }

    // load via rest
    private async rest(): Promise<T[]> {
        return this.client.getOrError<T[]>(this.CLIENT_URL || "");
    }
}
