import { resolve } from "url";

import HTTPClient from "../../Utils/HTTPClient";

import LibraryClient from "./LibraryClient";
import { IArchive, IDeclaration, IDocument, IGroup,
         IGroupRef, IMMTVersionInfo, IModule, IReferencable, ITag, URI } from "./objects";

// A client that talks to MMT via the REST interface
export default class RestClient extends LibraryClient {
    /**
     * Creates a new RestClient
     * @param MMT_URL The URL this client talks to
     */
    constructor(private readonly MMT_URL: string, private readonly client: HTTPClient) { super(); }

    async getMMTVersion(): Promise<IMMTVersionInfo> {
        return this.client.getOrError<IMMTVersionInfo>("version");
    }

    async getURI(uri: URI): Promise<IReferencable | undefined> {
        return this.client.getIfOK<IReferencable>(`content/uri?uri=${RestClient.encodeID(uri)}`);
    }

    async getGroups(): Promise<IGroupRef[]> {
        return this.client.getOrError<IGroupRef[]>(this.buildURL("content/groups"));
    }

    async getGroup(id: string): Promise<IGroup | undefined> {
        return this.client.getIfOK<IGroup>(this.buildURL("content/group", id));
    }

    async getTag(id: string): Promise<ITag | undefined> {
        return this.client.getIfOK<ITag>(this.buildURL("content/tag", id));
    }

    async getArchive(id: string): Promise<IArchive | undefined> {
        return this.client.getIfOK<IArchive>(this.buildURL("content/archive", id));
    }

    async getDocument(id: string): Promise<IDocument | undefined> {
        return this.client.getIfOK<IDocument>(this.buildURL("content/document", id));
    }

    async getModule(id: string): Promise<IModule | undefined> {
        return this.client.getIfOK<IModule>(this.buildURL("content/module", id));
    }

    async getDeclaration(id: string): Promise<IDeclaration | undefined> {
        return this.client.getIfOK<IDeclaration>(this.buildURL("content/declaration", id));
    }

    // builds a URL
    private buildURL(url: string, id?: string) {
        return resolve(this.MMT_URL, id ? `${url}` : `${url}?id=${RestClient.encodeID(id as string)}`);
    }

    // encodes an ID for use with the API
    private static encodeID(id: string | URI): string {
        return encodeURIComponent(id);
    }
}
