import { IArchive, IComponent, IDeclaration, IDocument, IGroup,
         IGroupRef, IMMTVersionInfo, IModule, IReferencable, ITag, URI } from "./objects";

export default abstract class LibraryClient {
    // gets the version of MMT */
    abstract getMMTVersion(): Promise<IMMTVersionInfo>;

    //
    // MMT Versions
    //

    // gets an object via a URI
    abstract getURI(uri: URI): Promise<IReferencable>;

    // gets a list of existing groups
    abstract getGroups(): Promise<IGroupRef[]>;

    // gets a specific group from MMT
    abstract getGroup(id: string): Promise<IGroup>;

    // gets a specific group from MMT
    abstract getTag(id: string): Promise<ITag>;

    // gets a given archive
    abstract getArchive(id: string): Promise<IArchive>;

    // gets a specific document
    abstract getDocument(id: string): Promise<IDocument>;

    // gets a specific module
    abstract getModule(id: string): Promise<IModule>;

    // gets a specific declaration
    abstract getDeclaration(id: string): Promise<IDeclaration>;

    // gets a specific component
    abstract getComponent(id: string): Promise<IComponent>;
}
