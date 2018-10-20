import { Client } from "./client";

import axios from "axios";

import { IArchive, IDocument, IGlossaryEntry, IGroup, IGroupRef, IMMTVersionInfo,
         IModule, INotebook, IReferencable, URI } from "../objects";

/** A client that talks to MMT via the REST interface */
export class RestClient extends Client {
    /**
     * Creates a new RestClient
     * @param MMT_URL The URL this client talks to
     */
    constructor(MMT_URL: string) {
        super();
        this.MMT_URL = MMT_URL;
    }

    /** the mmt url this Client communicates with */
    public readonly MMT_URL: string;

    private get<T>(url: string): Promise<T> {
        return axios.get<T | string>(this.MMT_URL + url).then((c) => {
            if (c.status !== 200 || typeof c.data === "string") {
                return Promise.reject(c.data as string);
            } else {
                return Promise.resolve(c.data as T);
            }
        });
    }

    public getMMTVersion(): Promise<IMMTVersionInfo> {
        return this.get("version");
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

    public getNotebook(id: string): Promise<INotebook> {
        return this.get("conten/module?id=" + this.encodeID(id));
    }

    public getGlossary(): Promise<IGlossaryEntry[]> {
        return this.get("content/glossary");
    }
}
