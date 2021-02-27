import { resolveURL } from "../../utils/resolve";
import HTTPClient from "../HTTPClient";

import LibraryClient from "./LibraryClient";
import {
    IArchive,
    IDeclaration,
    IDocument,
    IGroup,
    IGroupRef,
    IMMTVersionInfo,
    IModule,
    IReferencable,
    ITag,
    URI,
} from "./objects";

// A client that talks to MMT via the REST interface
export default class RestClient extends LibraryClient {
    /**
     * Creates a new RestClient
     * @param LIBRARY_URL The URL this client talks to
     */
    constructor(private readonly LIBRARY_URL: string, private readonly client: HTTPClient) {
        super();
    }

    getURL(): string | undefined {
        return this.LIBRARY_URL;
    }

    async getMMTVersion(): Promise<IMMTVersionInfo> {
        return this.client.getOrError<IMMTVersionInfo>(this.buildURL("version"));
    }

    async getURI(uri: URI): Promise<IReferencable | undefined> {
        return this.client.getIfOK<IReferencable>(this.buildURL("content/uri", "uri", uri));
    }

    async getGroups(): Promise<IGroupRef[]> {
        return this.client.getOrError<IGroupRef[]>(this.buildURL("content/groups"));
    }

    async getGroup(id: string): Promise<IGroup | undefined> {
        return this.client.getIfOK<IGroup>(this.buildURL("content/group", "id", id));
    }

    async getTag(id: string): Promise<ITag | undefined> {
        return this.client.getIfOK<ITag>(this.buildURL("content/tag", "id", id));
    }

    async getArchive(id: string): Promise<IArchive | undefined> {
        return this.client.getIfOK<IArchive>(this.buildURL("content/archive", "id", id));
    }

    async getDocument(id: string): Promise<IDocument | undefined> {
        return this.client.getIfOK<IDocument>(this.buildURL("content/document", "id", id));
    }

    async getModule(id: string): Promise<IModule | undefined> {
        return this.client.getIfOK<IModule>(this.buildURL("content/module", "id", id));
    }

    async getDeclaration(id: string): Promise<IDeclaration | undefined> {
        return this.client.getIfOK<IDeclaration>(this.buildURL("content/declaration", "id", id));
    }

    // builds a URL
    private buildURL(url: string, idParam?: string, id?: string) {
        return resolveURL(this.LIBRARY_URL, id ? `${url}?${idParam}=${RestClient.encodeID(id)}` : url);
    }

    // encodes an ID for use with the API
    private static encodeID(id: string | URI): string {
        return encodeURIComponent(id);
    }
}
