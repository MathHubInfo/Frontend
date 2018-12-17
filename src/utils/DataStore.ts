import { sortBy } from "lodash";

import { debugLog } from "./withDebug";

export default class DataStore<T> {
    constructor(
        private readonly getter: (id: string) => Promise<T | undefined>,
        private readonly onUpdate?: () => void,
        private readonly cycleDelay = 100,
        ...entries: Array<[string, T]>
    ) {
        this.cache = new Map<string, T>(entries);
    }

    // the known elements in this store
    private readonly cache: Map<string, T>;

    // the quenue of elements to be loaded
    private actualQuenue: string[] = [];

    // the qunue of elements to be pre-loaded
    // i.e. elements that should be loaded
    // should always remain sorted by number
    private preloadQuenue: Array<[number, string]> = [];

    // boolean indiciating if a loading cycle is currently running
    private isCycleRunning = false;

    // set to true if this object is due for being destroyed
    private stop = false;

    /**
     * Stops all future updates
     */
    destroy() {
        // clear everything
        this.actualQuenue = [];
        this.preloadQuenue = [];
        this.cache.clear();

        // and set the stop flag
        this.stop = true;
    }

    /**
     * Gets an element if it is currently stored
     */
    getElement(id: string): T | undefined {
        return this.cache.get(id);
    }

    /**
     * Checks if an element is "known" to the store
     * I.e. it is either in the store or quenued for loading
     */
    knowsElement(id: string): boolean {
        return this.cache.has(id) ||
            this.actualQuenue.indexOf(id) > -1 ||
            this.preloadQuenue.find(e => e[1] === id) !== undefined;
    }

    /**
     * Removes an element from this DataStore
     */
    clearElement(id: string): void {
        if (this.cache.delete(id))
           if (this.onUpdate && !this.stop) this.runNext(this.onUpdate);
    }

    /**
     * Informs the store to load an element
     * unless it is already loaded
     */
    loadElement(id: string): void {
        if (this.stop) return; // exit if we are stopped

        if (!this.knowsElement(id)) {
            this.actualQuenue.push(id);
            this.runNow(this.loadingCyle);
        }
    }

    /**
     * Informs the store to preload an element
     * as soon as the main quenue is empty
     * Elements with lower priority will be loaded first
     */
    preloadElement(id: string, priority = 0): void {
        if (this.stop) return; // exit if we are stopped

        if (!this.knowsElement(id)) {
            // insert [priority, id] into the list
            this.preloadQuenue = sortBy<[number, string]>([[priority, id], ...this.preloadQuenue], ([p]) => p);

            // and update
            this.runNow(this.loadingCyle);
        }
    }

    /**
     * Triggers a cycle of loading
     */
    private readonly loadingCyle = async () => {
        if (this.stop) return; // don't run if we are supposed to exit
        if (this.isCycleRunning) return; // don't run if we are already running

        if (this.actualQuenue.length === 0 && this.preloadQuenue.length === 0)
            return; // don't run if there is nothing to get

        // block all other attempts at running
        this.isCycleRunning = true;

        // grab the next element to fetch

        const isPreload = this.actualQuenue.length === 0;
        const [prio, next] = isPreload ?
            (this.preloadQuenue.pop() || [0, undefined]) :
            [0, this.actualQuenue.shift()];

        debugLog("preloadingCycle", next, "preload", isPreload);

        // if we have a new element to fetch
        if (next && !this.cache.has(next))
            try {
                // get the next data item
                const data = await this.getter(next);

                if (data === undefined) throw new Error("not found");

                // if we haven't stopped in the meanwhile
                // update the cache and call the update handler
                if (!this.stop) {
                    this.cache.set(next, data);
                    if (this.onUpdate) this.onUpdate();
                }

            // something went wrong, try loading this element again
            } catch (e) {
                this.runNext(() => {
                        if (isPreload) this.preloadElement(next, prio);
                        else this.loadElement(next);
                });
            }

        // end the current cycle and start the next one
        this.isCycleRunning = false;
        if (!this.stop) this.runNext(this.loadingCyle);
    }

    private readonly runNext = (f: () => void) => setTimeout(f, this.cycleDelay);
    private readonly runNow = (f: () => void) => setTimeout(f, 0);
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
    destroy = () => this.store.destroy();

    /**
     * Gets an element from the store
     */
    getElement = (id: string) => this.store.getElement(id);

    /**
     * Checks if this store contains a given item
     */
    contains = (id: string) => this.arrayGetter().indexOf(id) > -1;

    /**
     * Toggles a given item in this store
     */
    toggle = (id: string) => {
        this.arraySetter(ary => {
            const newAry = [...ary];
            const index = ary.indexOf(id);
            if (index > -1)
                // remove the element from the store
                newAry.splice(index, 1);
            else {
                // add the element to the elements to be loaded
                this.store.loadElement(id);

                // add the element to the ones to be expanded
                newAry.push(id);
            }

            return newAry;
          });
    }

    /**
     * Sets a given element to be pre-loaded
     */
    preload = (id: string, urgent: boolean) => this.store.preloadElement(id, urgent ? 0 : 1);
}
