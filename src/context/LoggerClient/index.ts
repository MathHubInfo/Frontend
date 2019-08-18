import { resolve as resolveURL } from "url";

import HTTPClient from "../HTTPClient";

/**
 * A client to retrieve logs from MMT
 */
export default class LoggerClient {
    /**
     * Creates a new LoggerClient
     * @param LIBRARY_URL The URL this client talks to
     */
    constructor(
        private readonly LIBRARY_URL: string,
        private readonly client: HTTPClient,
        private readonly resolve = false,
    ) {}

    // the current list of entries
    private readonly entries: ILogEntry[] = [];

    // have we been cancelled
    private cancelled = false;

    // the last UUID we received
    private lastUUID: string | null = null;

    async poll(callback: (entries: ILogEntry[]) => void, timeout?: number) {
        const theTimeout = timeout || 1000;
        const r = await this.doPoll();

        if (this.cancelled) return;

        callback(r);

        window.setTimeout(
            () => {
                this.poll(callback, theTimeout)
                    .catch(_ => null);
            },
            theTimeout,
        );
    }

    stopPoll() {
        this.cancelled = true;
    }

    // polls some data from the server
    private async doPoll(): Promise<ILogEntry[]> {
        // load entries from the server
        const newEntries = await this.client.getOrError<ILogEntry[]>(
            resolveURL(this.LIBRARY_URL, this.lastUUID ? (`log/after?uuid=${this.lastUUID}`) : "log/all"),
            {resolve: this.resolve},
        );

        // add the new entries and update the last uuid
        this.entries.push.apply(this.entries, newEntries);
        this.updateUUID();

        // and return
        return this.entries.slice(0);
    }

    private updateUUID() {
        if (this.entries.length > 0)
            this.lastUUID = this.entries[this.entries.length - 1].uuid;
    }
}

// an interface for a log entry
export interface ILogEntry {
    // a unique id
    uuid: string;
    // unix epoch time of creation
    time: number;
    // tslint:disable-next-line:no-banned-terms
    caller: string;
    // indentation
    indent: number;
    // log prefix
    prefix: string;
    // newline-seperated content
    parts: string[];
}
