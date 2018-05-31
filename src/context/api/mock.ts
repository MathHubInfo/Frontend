import { MMTAPIClient } from "./client";
import {
    IApiObject,
    IArchive,
    IArchiveRef,
    IDocument,
    IDocumentRef,
    IGroup,
    IGroupRef,
    IModule,
    IOpaqueElement,
    IReferencable,
    ITheory,
    ITheoryRef,
    IView,
    IViewRef,
    URI,
} from "./index";

/** An API client to MMT that mocks results by resolving them statically from a given datatset */
export class MockAPIClient extends MMTAPIClient {

    // #region "Dataset"

    /** loads the dataset */
    private loadDataSet(): Promise<IMockDataSet> {
        return import("../../../assets/mock.json").then((m) => m.default);
    }

    /**
     * gets an object matching a filter from the data set
     * or returns an error message
     * @param getter function to get object from dataset
     * @param errorMessage error to throw when the object does not exist
     */
    private getObjectOfType<T extends IApiObject>(
        getter: (data: IMockDataSet) => T | undefined,
        errorMessage: string,
    ): Promise<T>  {
        return this.loadDataSet().then((ds) => {
            const obj = getter(ds);
            if (typeof obj === "undefined") {
                return Promise.reject(errorMessage);
            } else {
                return this.cleanObject(obj);
            }
        });
    }

    // #endregion

    // #region "Cleaners"

    /** cleans an object returned from the mock dataset */
    private cleanObject<T extends IApiObject>(obj: T): Promise<T> {
        return this.loadDataSet().then((ds) => this.cleanAny(obj, ds));
    }

    private cleanAny<T extends IApiObject>(obj: T, ds: IMockDataSet): T {
        let co: any; // cleaned object
        switch (obj.kind) {
            case "group":
                co = obj.ref ?
                    this.cleanGroupRef(obj as IGroupRef, ds) :
                    this.cleanGroup(obj as IGroup, ds);
                break;
            case "archive":
                co = obj.ref ?
                    this.cleanArchiveRef(obj as IArchiveRef, ds) :
                    this.cleanArchive(obj as IArchive, ds);
                break;
            case "document":
                co = obj.ref ?
                    this.cleanDocumentRef(obj as IDocumentRef, ds) :
                    this.cleanDocument(obj as IDocument, ds);
                break;
            case "opaque":
                co = this.cleanOpaque(obj as IOpaqueElement, ds);
            case "theory":
                co = obj.ref ?
                    this.cleanTheoryRef(obj as ITheoryRef, ds) :
                    this.cleanTheory(obj as ITheory, ds);
            case "view":
                co = obj.ref ?
                    this.cleanViewRef(obj as IViewRef, ds) :
                    this.cleanView(obj as IView, ds);
            default:
                co = obj;
                break;
        }

        // this cast is type safe because of clean* methods do not change type
        return co as T;
    }

    private cleanGroupRef(group: IGroupRef, ds: IMockDataSet): IGroupRef {
        // TODO: Write me
        return group;
    }

    private cleanGroup(group: IGroup, ds: IMockDataSet): IGroup {
        // TODO: Write me
        return group;
    }

    private cleanArchiveRef(archive: IArchiveRef, ds: IMockDataSet): IArchiveRef {
        // TODO: Write me
        return archive;
    }

    private cleanArchive(archive: IArchive, ds: IMockDataSet): IArchive {
        // TODO: Write me
        return archive;
    }

    private cleanDocumentRef(document: IDocumentRef, ds: IMockDataSet): IDocumentRef {
        // TODO: Write me
        return document;
    }

    private cleanDocument(document: IDocument, ds: IMockDataSet): IDocument {
        // TODO: Write me
        return document;
    }

    private cleanOpaque(opaque: IOpaqueElement, ds: IMockDataSet): IOpaqueElement {
        // TODO: Write me
        return opaque;
    }

    private cleanTheoryRef(theory: ITheoryRef, ds: IMockDataSet): ITheoryRef {
        // TODO: Write me
        return theory;
    }

    private cleanTheory(theory: ITheory, ds: IMockDataSet): ITheory {
        // TODO: Write me
        return theory;
    }

    private cleanViewRef(view: IViewRef, ds: IMockDataSet): IViewRef {
        // TODO: Write me
        return view;
    }

    private cleanView(view: IView, ds: IMockDataSet): IView {
        // TODO: Write me
        return view;
    }

    // #endregion

    // #region "Getters"

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

    /** given a URI, returns an object */
    public getURI(uri: URI): Promise<IReferencable> {
        return this.getObjectOfType(
            (ds: IMockDataSet) => ds.modules.find((m) => m.id === uri) || ds.documents.find((d) => d.id === uri),
            `No Document or Module with ${uri} exists. `,
        );
    }

    /** gets a group from the mock dataset */
    public getGroup(id: string): Promise<IGroup> {
        return this.getObjectOfType(
            (ds: IMockDataSet) => ds.groups.find((g) => g.id === id),
            `Group ${id} does not exist. `,
        );
    }

    /** gets an archive from the mock dataset */
    public getArchive(id: string): Promise<IArchive> {
        return this.getObjectOfType(
            (ds: IMockDataSet) => ds.archives.find((a) => a.id === id),
            `Archive ${id} does not exist. `,
        );
    }

    /** gets a document from the mock dataset */
    public getDocument(id: string): Promise<IDocument> {
        return this.getObjectOfType(
            (ds: IMockDataSet) => ds.documents.find((d) => d.id === id),
            `Document ${id} does not exist. `,
        );
    }

    /** gets a module from the mock dataset */
    public getModule(id: string): Promise<IModule> {
        return this.getObjectOfType(
            (ds: IMockDataSet) => ds.modules.find((m) => m.id === id),
            `Module ${id} does not exist. `,
        );
    }

    // #endregion
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
