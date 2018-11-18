import { IArchive, IDocument, IGroup, IGroupRef, IMMTVersionInfo,
         IModule, IReferencable, ITag, URI } from "./objects";

export default abstract class MMTClient {
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

    /** gets a specific group from MMT */
    public abstract getTag(id: string): Promise<ITag>;

    /** gets a given archive */
    public abstract getArchive(id: string): Promise<IArchive>;

    /** gets a specific document */
    public abstract getDocument(id: string): Promise<IDocument>;

    /** gets a specific module */
    public abstract getModule(id: string): Promise<IModule>;
}
