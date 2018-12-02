import Axios from "axios";

import Parallel from "../../Utils/Parallel";

import LibraryClient from "./LibraryClient";
import { IArchive, IDeclaration, IDocument, IGroup,
         IGroupRef, IMMTVersionInfo, IModule, IReferencable, ITag, URI } from "./objects";

// A client that talks to MMT via the REST interface
export default class RestClient extends LibraryClient {
    /**
     * Creates a new RestClient
     * @param MMT_URL The URL this client talks to
     */
    constructor(MMT_URL: string, maxParallelRequests = 1) {
        super();
        this.MMT_URL = MMT_URL;
        this.parallel = new Parallel(maxParallelRequests);
    }

    private readonly parallel: Parallel;

    // the mmt url this Client communicates with
    private readonly MMT_URL: string;

    async getMMTVersion(): Promise<IMMTVersionInfo> {
        const version = await this.getURL<IMMTVersionInfo>("version");
        if (version === undefined) throw new Error("Version Information not available");

        return version;
    }

    // encodes an ID for use with the API
    encodeID(id: string | URI): string {
        return encodeURIComponent(id);
    }

    async getURI(uri: URI): Promise<IReferencable | undefined> {
        return this.getURL<IReferencable>(`content/uri?uri=${this.encodeID(uri)}`);
    }

    async getGroups(): Promise<IGroupRef[]> {
        const groups = await this.getURL<IGroupRef[]>("content/groups");
        if (groups === undefined) throw new Error("Groups Listing not available");

        return groups;
    }

    async getGroup(id: string): Promise<IGroup | undefined> {
        return this.getURL<IGroup>(`content/group?id=${this.encodeID(id)}`);
    }

    async getTag(id: string): Promise<ITag | undefined> {
        return this.getURL<ITag>(`content/tag?id=${this.encodeID(id)}`);
    }

    async getArchive(id: string): Promise<IArchive | undefined> {
        return this.getURL<IArchive>(`content/archive?id=${this.encodeID(id)}`);
    }

    async getDocument(id: string): Promise<IDocument | undefined> {
        return this.getURL<IDocument>(`content/document?id=${this.encodeID(id)}`);
    }

    async getModule(id: string): Promise<IModule | undefined> {
        return this.getURL<IModule>(`content/module?id=${this.encodeID(id)}`);
    }

    async getDeclaration(id: string): Promise<IDeclaration | undefined> {
        return this.getURL<IDeclaration>(`content/declaration?id=${this.encodeID(id)}`);
    }

    private async getURL<T>(url: string): Promise<T | undefined> {
        const c = await this.parallel.run(() => Axios.get<T | string>(this.MMT_URL + url));
        if (c.status === 404) return undefined;
        if (c.status !== 200 || typeof c.data === "string") throw new Error(c.data as string);
        else return c.data;
    }
}
