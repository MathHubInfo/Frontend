import { MMTAPIClient } from "./client";
import { IArchive, IDocument, IGroup, IGroupRef, IModule, IOpaqueElement, IReferencable, URI } from "./index";
// import { delay } from "utils/promises"

/** An API client to MMT that mocks results by resolving them statically from a given datatset */
export class MockAPIClient extends MMTAPIClient {

    /** loads the dataset */
    private loadDataSet(): Promise<IMockDataSet> { return this.delay(
        import("../../../assets/mock.json").then((m) => m.default),
    ); }

    /** delays a given promise by a specific amount of milliseconds */
    private delay<T>(p: Promise<T>): Promise<T> {
        return p; // return delay(p, 1000);
    }

    public getURI(uri: URI): Promise<IReferencable> {
        return Promise.reject("not implemented");
    }

    /** retrieves all groups from the dataset */
    public getGroups(): Promise<IGroupRef[]> {
        return this.loadDataSet().then((ds) => ds.groups.map(this.IGroupToRef));
    }
    private IGroupToRef(group: IGroup): IGroupRef {
        return {
            kind: "group",
            ref: true,
            parent: undefined,

            id: group.id,
            title: group.title,
            teaser: group.teaser,
        };
    }

    public getGroup(id: string): Promise<IGroup> {
        return Promise.reject("not implemented");
    }

    public getArchive(id: string): Promise<IArchive> {
        return Promise.reject("not implemented");
    }

    public getDocument(id: string): Promise<IDocument> {
        return Promise.reject("not implemented");
    }

    public getModule(id: string): Promise<IModule> {
        return Promise.reject("not implemented");
    }
}

/** a mock data-set, contained in mock.json; all parent references may only fill the id property */
interface IMockDataSet {
    /** a set of archives, will auto-fill the archives property */
    groups: IGroup[];
    /** a set of archives, will auto-fill the narrativeRoot property */
    archives: IArchive[];
    /** a set of opaque elements */
    opaques: IOpaqueElement[];

    /** a set of documents, will auto-fill the decls property */
    documents: IDocument[];
    /** a set of modules */
    modules: IModule[];
}
