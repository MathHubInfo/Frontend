import { IArchive, IDeclaration, IDocument, IGroup,
         IGroupRef, IMMTVersionInfo, IModule, IReferencable, ITag, URI } from "./objects";

export default abstract class LibraryClient {
    // gets the version of MMT */
    abstract getMMTVersion(): Promise<IMMTVersionInfo>;

    //
    // Actual Library requests
    // - undefined means that the requested item is not found
    // - a rejection of the promise means that something went wrong
    //

    // gets an object via a URI
    abstract getURI(uri: URI): Promise<IReferencable | undefined>;

    // gets a list of existing groups
    abstract getGroups(): Promise<IGroupRef[]>;

    // gets a specific group from MMT
    abstract getGroup(id: string): Promise<IGroup | undefined>;

    // gets a specific group from MMT
    abstract getTag(id: string): Promise<ITag | undefined>;

    // gets a given archive
    abstract getArchive(id: string): Promise<IArchive | undefined>;

    // gets a specific document
    abstract getDocument(id: string): Promise<IDocument | undefined>;

    // gets a specific module
    abstract getModule(id: string): Promise<IModule | undefined>;

    // gets a specific declaration
    abstract getDeclaration(id: string): Promise<IDeclaration | undefined>;
}
