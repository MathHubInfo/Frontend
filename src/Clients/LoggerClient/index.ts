import { resolve } from "url";

import HTTPClient from "../../Utils/HTTPClient";

/**
 * A client to retrieve logs from MMT
 */
export default class LoggerClient {
    /**
     * Creates a new LoggerClient
     * @param MMT_URL The URL this client talks to
     */
    constructor(private readonly MMT_URL: string, private readonly client: HTTPClient) {}

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
                    .catch(e => null);
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
            resolve(this.MMT_URL, this.lastUUID ? (`log/after?uuid=${this.lastUUID}`) : "log/all"),
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
    // name of the creating function
    // tslint:disable-next-line:no-suspicious-comment
    // FIXME: Rename this reserved name on the server side
    // tslint:disable-next-line:no-banned-terms
    caller: string;
    // indentation
    indent: number;
    // log prefix
    prefix: string;
    // newline-seperated content
    parts: string[];
}
