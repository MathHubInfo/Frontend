import Axios from "axios";

import LibraryClient from "./LibraryClient";
import { IArchive, IComponent, IDeclaration, IDocument, IGroup,
         IGroupRef, IMMTVersionInfo, IModule, IReferencable, ITag, URI } from "./objects";

// A client that talks to MMT via the REST interface
export default class RestClient extends LibraryClient {
    /**
     * Creates a new RestClient
     * @param MMT_URL The URL this client talks to
     */
    constructor(MMT_URL: string) {
        super();
        this.MMT_URL = MMT_URL;
    }

    // the mmt url this Client communicates with
    private readonly MMT_URL: string;

    async getMMTVersion(): Promise<IMMTVersionInfo> {
        return this.getURL<IMMTVersionInfo>("version");
    }

    // encodes an ID for use with the API
    encodeID(id: string | URI): string {
        return encodeURIComponent(id);
    }

    async getURI(uri: URI): Promise<IReferencable> {
        return this.getURL<IReferencable>(`content/uri?uri=${this.encodeID(uri)}`);
    }

    async getGroups(): Promise<IGroupRef[]> {
        return this.getURL<IGroupRef[]>("content/groups");
    }

    async getGroup(id: string): Promise<IGroup> {
        return this.getURL<IGroup>(`content/group?id=${this.encodeID(id)}`);
    }

    async getTag(id: string): Promise<ITag> {
        return this.getURL<ITag>(`content/tag?id=${this.encodeID(id)}`);
    }

    async getArchive(id: string): Promise<IArchive> {
        return this.getURL<IArchive>(`content/archive?id=${this.encodeID(id)}`);
    }

    async getDocument(id: string): Promise<IDocument> {
        return this.getURL<IDocument>(`content/document?id=${this.encodeID(id)}`);
    }

    async getModule(id: string): Promise<IModule> {
        return this.getURL<IModule>(`content/module?id=${this.encodeID(id)}`);
    }

    async getDeclaration(id: string): Promise<IDeclaration> {
        return this.getURL<IDeclaration>(`content/declaration?id=${this.encodeID(id)}`);
    }

    async getComponent(id: string): Promise<IComponent> {
        return this.getURL<IComponent>(`content/component?id=${this.encodeID(id)}`);
    }

    private async getURL<T>(url: string): Promise<T> {
        const c = await Axios.get<T | string>(this.MMT_URL + url);
        if (c.status !== 200 || typeof c.data === "string")
            throw new Error(c.data as string);
        else
            return c.data;
    }
}
