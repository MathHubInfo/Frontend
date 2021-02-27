import { sortBy } from "lodash";

import { DebugLog } from "./WithDebug";

/**
 * DataStore is an object that loads data from a getter
 * Data is loaded asyncronously, and with a priority
 */
export default class DataStore<T> {
    /**
     * Create a new DataStore
     * @param getter function to load elements from
     * @param onUpdate Function to call on update
     * @param cycleDelay Delay between loading cycles
     * @param entries Existing entries at the beginning
     */
    constructor(
        private readonly getter: (id: string) => Promise<T | undefined>,
        private readonly onUpdate?: () => void,
        private readonly cycleDelay = 100,
        ...entries: Array<[string, T]>
    ) {
        this.cache = new Map<string, T>(entries);
    }

    private readonly cache: Map<string, T>; // data that has actually been loaded

    // There are two kinds of quenues
    // - a regular quenue to load elements
    // - a priority quenue to load elements from
    private quenue: string[] = [];
    private pQuenue: Array<[number, string]> = [];

    // state of the loading cycle
    private isCycleRunning = false;
    private stop = false;

    //
    // Element getters
    //

    /**
     * Has checks if this store has the provided element in the cache
     * @param id ID of element to check
     */
    has(id: string): boolean {
        return this.cache.has(id) || this.quenue.indexOf(id) > -1 || this.pQuenue.find(e => e[1] === id) !== undefined;
    }

    /**
     * Get gets an element if this store currently has it in the cache
     * @param id ID of element to get
     */
    get(id: string): T | undefined {
        return this.cache.get(id);
    }

    /**
     * Delete removes an element from the cache
     * @param id ID of element to delete
     */
    delete(id: string): void {
        if (this.cache.delete(id)) if (this.onUpdate && !this.stop) this.runAsyncNext(this.onUpdate);
    }

    /**
     * destroy stops all future updates to this DataStore
     */
    destroy(): void {
        // set the stop flag
        // and then clear all the quenues
        this.stop = true;
        this.quenue = [];
        this.pQuenue = [];
        this.cache.clear();
    }

    /**
     * Load informs this store to load an element.
     * Load requests are stored in a FIFO.
     * @param id ID of element to load
     */
    load(id: string): void {
        // if we have already loaded this element
        // or are stopped, don't do anything
        if (this.stop || this.has(id)) return;

        this.quenue.push(id);
        this.runAsync(this.loadingCyle);
    }

    /**
     * Preload informs this store to prioritize loading an element.
     * Load requests are stored in a FIFO quenue that is stored by priority.
     * Preload requests are prioritized over normal load requests.
     * Elements with the lowest priority are loaded first.
     * @param id ID of element to preload
     * @param priority Priority of loading request
     */
    preload(id: string, priority = 0): void {
        // if we have already loaded this element
        // or are stopped, don't do anything
        if (this.stop || this.has(id)) return;

        this.pQuenue = sortBy<[number, string]>([[priority, id], ...this.pQuenue], ([p]) => p);
        this.runAsync(this.loadingCyle);
    }

    /**
     * Triggers a cycle of loading
     */
    private readonly loadingCyle = async () => {
        // if we are supposed to stop, or the cycle is already running
        // we don't need to run
        if (this.stop || this.isCycleRunning) return;

        // if there are no elements in either quenue
        // we don't need to run either
        if (this.quenue.length === 0 && this.pQuenue.length === 0) return;

        // run the actual loading cycle
        this.isCycleRunning = true;
        await this.loadingCycleActual();
        this.isCycleRunning = false;

        // setup the next cycle if needed
        if (this.stop) return;
        this.runAsyncNext(this.loadingCyle);
    };

    private readonly loadingCycleActual = async () => {
        // find the next element to load
        const isPreload = this.pQuenue.length !== 0;
        const [prio, next] = isPreload ? (this.pQuenue.pop() as [number, string]) : [0, this.quenue.shift()];

        DebugLog("preloadingCycle", next, "preload", isPreload);

        // if we don't have an element to load
        // or we have already loaded it, we're done
        if (next === undefined || this.cache.has(next)) return;

        try {
            const data = await this.getter(next);
            if (data === undefined) throw new Error("not found");

            // there was an async, so we could have stopped
            if (this.stop) return;

            // store the element and trigger the update call
            this.cache.set(next, data);
            if (this.onUpdate) this.onUpdate();
        } catch (e) {
            this.runAsyncNext(() => {
                if (isPreload) this.preload(next, prio);
                else this.load(next);
            });
        }
    };

    private readonly runAsyncNext = (f: () => void) => setTimeout(f, this.cycleDelay);
    private readonly runAsync = (f: () => void) => setTimeout(f, 0);
}

export class BooleanArrayStore<T> {
    constructor(
        private readonly arrayGetter: () => string[],
        private readonly arraySetter: (update: (ary: string[]) => string[]) => void,
        getter: (id: string) => Promise<T | undefined>,
        onUpdate?: () => void,
        cycleDelay = 1000,
        ...entries: Array<[string, T]>
    ) {
        this.store = new DataStore(getter, onUpdate, cycleDelay, ...entries);
    }

    private readonly store: DataStore<T>;

    /**
     * Destroys this store
     */
    destroy = (): void => this.store.destroy();

    /**
     * Gets an element from the store
     */
    get = (id: string): T | undefined => this.store.get(id);

    /**
     * Checks if this store contains a given item
     */
    contains = (id: string): boolean => this.arrayGetter().indexOf(id) > -1;

    /**
     * Toggles a given item in this store
     */
    toggle = (id: string): void => {
        this.arraySetter(ary => {
            const newAry = [...ary];
            const index = ary.indexOf(id);
            if (index > -1)
                // remove the element from the store
                newAry.splice(index, 1);
            else {
                // add the element to the elements to be loaded
                this.store.load(id);

                // add the element to the ones to be expanded
                newAry.push(id);
            }

            return newAry;
        });
    };

    /**
     * Sets a given element to be pre-loaded
     */
    preload = (id: string, urgent: boolean): void => this.store.preload(id, urgent ? 0 : 1);
}
