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
    INarrativeElement,
    INarrativeParentRef,
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
    private dataset: IMockDataSet | undefined;

    /** loads the dataset */
    private loadDataSet(): Promise<IMockDataSet> {

        // if we already fetched the dataset
        // we can return it immediatly
        if (typeof this.dataset !== "undefined") {
            return Promise.resolve(this.dataset);
        }

        // else we need to fetch it
        return import("../../../assets/mock.json").then((m) => m.default as IMockDataSet)
            .then((ds) => {

                // TODO: Do we want run-time type checking here?
                // and warn the developer about archives missing and such
                this.dataset = {
                    groups:
                        ds.groups.map((dg) => { dg.kind = "group"; return dg; }),
                    archives:
                        ds.archives.map((da) => { da.kind = "archive"; return da; }),
                    opaques:
                        ds.opaques.map((dso) => { dso.kind = "opaque"; dso.id = ""; return dso; }),
                    documents:
                        ds.documents.map((dc) => { dc.kind = "document"; return dc; }),
                    modules: ds.modules,
                };

                return this.dataset as IMockDataSet;
            });
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
                return Promise.resolve(this.cleanAny(obj, ds));
            }
        });
    }

    // #endregion

    // #region "Cleaners"

    private cleanAny<T extends IApiObject>(obj: T, ds: IMockDataSet): T {
        let co: any; // cleaned object
        switch (obj.kind) {
            case "group":
                co = obj.ref ?
                    this.cleanGroupRef(obj, ds) :
                    this.cleanGroup(obj as IGroup, ds);
                break;
            case "archive":
                co = obj.ref ?
                    this.cleanArchiveRef(obj, ds) :
                    this.cleanArchive(obj, ds);
                break;
            case "document":
                co = obj.ref ?
                    this.cleanDocumentRef(obj, ds) :
                    this.cleanDocument(obj, ds);
                break;
            case "opaque":
                co = this.cleanOpaque(obj, ds);
            case "theory":
                co = obj.ref ?
                    this.cleanTheoryRef(obj, ds) :
                    this.cleanTheory(obj, ds);
            case "view":
                co = obj.ref ?
                    this.cleanViewRef(obj, ds) :
                    this.cleanView(obj, ds);
            default:
                console.warn(`Mock Dataset: Got object of unknown kind ${obj.kind}, skipping cleanup. `);
                co = obj;
                break;
        }

        // this cast is type safe because of clean* methods do not change type
        return co as T;
    }

    private cleanGroupRef(group: IMockObject, ds: IMockDataSet): IGroupRef {
        const actual = ds.groups.find((g) => g.id === group.id)!;

        return {
            kind: "group",
            parent: null,
            ref: true,

            id: actual.id,
            title: actual.title,
            teaser: actual.teaser,
        };
    }

    private cleanArchiveRef(archive: IMockObject, ds: IMockDataSet): IArchiveRef {
        const actual = ds.archives.find((a) => a.id === archive.id)!;
        const parent = this.cleanGroupRef(actual.parent, ds);

        return {
            kind: "archive",
            parent,
            ref: true,

            id: actual.id,
            name: actual.name,

            title: actual.title,
            teaser: actual.teaser,
        };
    }

    private cleanNarrativeParentRef(ref: IMockObject, ds: IMockDataSet): INarrativeParentRef {

        // if we can find a document reference, return a document
        const docRef = ds.documents.find((d) => d.id === ref.id);
        if (typeof docRef !== "undefined") {
            return this.cleanDocumentRef(ref, ds);

        // else try and find an archive reference
        } else {
            return this.cleanArchiveRef(ref, ds);
        }
    }

    private cleanDocumentRef(document: IMockObject, ds: IMockDataSet): IDocumentRef {
        const actual = ds.documents.find((d) => d.id === document.id)!;
        const parent = this.cleanNarrativeParentRef(actual.parent, ds);

        return {
            kind: "document",
            parent,
            ref: true,

            name: actual.name,
            id: actual.id,
        };
    }

    private cleanTheoryRef(theory: IMockObject, ds: IMockDataSet): ITheoryRef {
        const actual = ds.modules.find((t) => t.id === theory.id && t.kind === "theory")! as ITheory;
        const parent = this.cleanNarrativeParentRef(actual.parent, ds);

        return {
            kind: "theory",
            parent,
            ref: true,

            name: actual.name,
            id: actual.id,
        };
    }

    private cleanViewRef(view: IMockObject, ds: IMockDataSet): IViewRef {
        const actual = ds.modules.find((v) => v.id === view.id && v.kind === "view")! as IView;
        const parent = this.cleanNarrativeParentRef(actual.parent, ds);

        return {
            kind: "view",
            parent,
            ref: true,

            name: actual.name,
            id: actual.id,
        };
    }

    private cleanGroup(group: IMockObject, ds: IMockDataSet): IGroup {
        const ref = this.cleanGroupRef(group, ds);
        const actual = ds.groups.find((g) => g.id === group.id)!;

        const archives = ds.archives
            .filter((a) => a.parent.id === group.id)
            .map((a) => this.cleanArchiveRef(a, ds));

        return {
            ...ref,
            ref: false,

            description: actual.description,
            responsible: actual.responsible,
            archives,
        };
    }

    private findNarrativeChildren(parent: IMockObject, ds: IMockDataSet): INarrativeElement[] {
        // TODO: Figure out a way to maintain order

        const opaques = ds.opaques
            .filter((o) => o.parent.id === parent.id)
            .map((o) => this.cleanOpaque(o, ds));

        const documents = ds.documents
            .filter((d) => d.parent.id === parent.id)
            .map((d) => this.cleanDocument(d, ds));

        const modules = ds.modules
            .filter((m) => m.parent.id === parent.id)
            .map((m) => m.kind === "theory" ? this.cleanTheoryRef(m, ds) : this.cleanViewRef(m, ds));

        return ([] as any[])
            .concat(opaques, documents, modules);
    }

    private cleanArchive(archive: IMockObject, ds: IMockDataSet): IArchive {
        const ref = this.cleanArchiveRef(archive, ds);
        const actual = ds.archives.find((a) => a.id === archive.id)!;

        const narrativeRoot = this.findNarrativeChildren(archive, ds);

        return {
            ...ref,
            ref: false,

            description: actual.description,
            responsible: actual.responsible,
            narrativeRoot,
        };
    }

    private cleanDocument(document: IMockObject, ds: IMockDataSet): IDocument {
        const ref = this.cleanDocumentRef(document, ds);
        // const actual = ds.documents.find((d) => d.id === document.id)!;

        const decls = this.findNarrativeChildren(document, ds);

        return {
            ...ref,
            ref: false,

            decls,
        };
    }

    private cleanOpaque(opaque: IMockObject, ds: IMockDataSet): IOpaqueElement {
        const actual = opaque as IOpaqueElement;
        const parent = this.cleanNarrativeParentRef(actual.parent, ds);

        return {
            kind: "opaque",
            ref: false,

            id: "",
            parent,

            text: actual.text,
        };
    }

    private cleanTheory(theory: IMockObject, ds: IMockDataSet): ITheory {
        const ref = this.cleanTheoryRef(theory, ds);
        const actual = ds.modules.find((t) => t.id === theory.id && t.kind === "theory")! as ITheory;

        const meta = actual.meta ? this.cleanTheoryRef(actual.meta!, ds) : undefined;

        return {
            ...ref,
            ref: false,

            presentation: actual.presentation,
            source: actual.source,

            meta,
        };
    }

    private cleanView(view: IMockObject, ds: IMockDataSet): IView {
        const ref = this.cleanViewRef(view, ds);
        const actual = ds.modules.find((v) => v.id === view.id && v.kind === "view")! as IView;

        const domain = this.cleanTheoryRef(actual.domain, ds);
        const codomain = this.cleanTheoryRef(actual.codomain, ds);

        return {
            ...ref,
            ref: false,

            presentation: actual.presentation,
            source: actual.source,

            domain,
            codomain,
        };
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
            parent: null,

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

/**
 * The Mock Data Set contained in mock.json
 *
 * The type here is only for tsc, the actual type can limit all
 * IReferences to be shallow in the sense of only having the 'id' property.
 *
 * Furthermore, the 'kind' and child atttributes may be omitted where unique.
 */
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

/** represents a shallow mocked object returned by the API */
interface IMockObject {
    id: string;
}
