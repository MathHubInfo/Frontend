import { IArchive, IDocument, IGlossaryEntry, IGroup, IGroupRef, IMMTVersionInfo,
         IModule, INotebook, IReferencable, URI } from "../objects";

export abstract class Client {
    /** gets the version of MMT */
    public abstract getMMTVersion(): Promise<IMMTVersionInfo>;

    //
    // MMT Versions
    //

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

    /** gets a specific notebook */
    public abstract getNotebook(id: string): Promise<INotebook>;

    /** gets a set of glossary entries */
    public abstract getGlossary(): Promise<IGlossaryEntry[]>;
}
