import Axios from "axios";

export default class LoggerClient {
    /**
     * Creates a new LoggerClient
     * @param MMT_URL The URL this client talks to
     */
    constructor(MMT_URL: string) {
        this.MMT_URL = MMT_URL;
    }

    /** the mmt url this Client communicates with */
    public readonly MMT_URL: string;

    /** the current list of entries */
    private entries: ILogEntry[] = [];

    /** polls some data from the server */
    private async doPoll(): Promise<ILogEntry[]> {
        // load entries from the server
        const newEntries = await this.get<ILogEntry[]>(this.lastUUID ? ("log/after?uuid=" + this.lastUUID) : "log/all");

        // add the new entries and update the last uuid
        this.entries.push.apply(this.entries, newEntries);
        this.updateUUID();

        // and return
        return this.entries.slice(0);
    }

    private cancelled = false;
    public poll(callback: (entries: ILogEntry[]) => void, timeout?: number) {
        const theTimeout = timeout || 1000;
        this.doPoll().then((r) => {
            if (this.cancelled) {
                return;
            }
            callback(r);
            window.setTimeout(() => {
                this.poll(callback, theTimeout);
            }, theTimeout);
        });
    }

    public stopPoll() {
        this.cancelled = true;
    }

    /** the last received uuid */
    private lastUUID: string | null = null;
    private updateUUID() {
        if (this.entries.length > 0) {
            this.lastUUID = this.entries[this.entries.length - 1].uuid;
        }
    }

    private get<T>(url: string): Promise<T> {
        return Axios.get<T | string>(this.MMT_URL + url).then((c) => {
            if (c.status !== 200 || typeof c.data === "string") {
                return Promise.reject(c.data as string);
            } else {
                return Promise.resolve(c.data as T);
            }
        });
    }
}

/** an interface for a log entry */
export interface ILogEntry {
    uuid: string;
    time: number;
    caller: string;
    indent: number;
    prefix: string;
    parts: string[];
}
