import { IMathHubConfig } from "../config";

import axios from "axios";

import { IArchive, IDocument, IGroup, IGroupRef, IModule, IReferencable, URI } from "./index";

/**
 * A client for the mathhub-mmt api
 */
export abstract class MMTAPIClient {
    protected readonly config: IMathHubConfig;

    constructor(config: IMathHubConfig) {
        this.config = config;
    }

    /** gets an object via a URI */
    public abstract getURI(uri: URI): Promise<IReferencable>;

    /** gets a list of existing groups */
    public abstract getGroups(): Promise<IGroupRef[]>;

    /** gets a specific group from MMT */
    public abstract getGroup(id: string): Promise<IGroup>;

    /** gets a given archive */
    public abstract getArchive(id: string): Promise<IArchive>;

    /** gets a specific document */
    public abstract getDocument(id: string): Promise<IDocument>;

    /** gets a specific module */
    public abstract getModule(id: string): Promise<IModule>;
}

/**
 * A client for the mathhub-mmt api that requests content via REST
 */
export class RestAPIClient extends MMTAPIClient {
    private get<T>(url: string): Promise<T> {
        return axios.get<T | string>(this.config.mmtURL + url).then((c) => {
            if (c.status !== 200 || typeof c.data === "string") {
                return Promise.reject(c.data as string);
            } else {
                return Promise.resolve(c.data as T);
            }
        });
    }

    /** encodes an ID for use with the API */
    private encodeID(id: string | URI): string {
        return encodeURIComponent(id);
    }

    public getURI(uri: URI): Promise<IReferencable> {
        return this.get("content/uri?uri=" + this.encodeID(uri));
    }

    public getGroups(): Promise<IGroupRef[]> {
        return this.get("content/groups");
    }

    public getGroup(id: string): Promise<IGroup> {
        return this.get("content/group?id=" + this.encodeID(id));
    }

    public getArchive(id: string): Promise<IArchive> {
        return this.get("content/archive?id=" + this.encodeID(id));
    }

    public getDocument(id: string): Promise<IDocument> {
        return this.get("content/document?id=" + this.encodeID(id));
    }

    public getModule(id: string): Promise<IModule> {
        return this.get("content/module?id=" + this.encodeID(id));
    }
}
