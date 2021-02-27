import LibraryClient from "../LibraryClient";

import {
    IApiObject,
    IArchive,
    IArchiveRef,
    IDeclaration,
    IDeclarationRef,
    IDocument,
    IDocumentParentRef,
    IDocumentRef,
    IGroup,
    IGroupRef,
    IMMTVersionInfo,
    IModule,
    IModuleRef,
    INarrativeElement,
    IOpaqueElement,
    IOpaqueElementRef,
    IReferencable,
    ITag,
    ITagRef,
    URI,
} from "../objects";

import { IMockDataSet, IMockModule, IMockObject, IMockReference } from "./set";

// An API client to MMT that mocks results by resolving them statically from a given datatset
class LazyMockClient extends LibraryClient {
    constructor(datasetFactory: () => Promise<IMockDataSet>) {
        super();
        this.datasetFactory = datasetFactory;
    }

    private readonly datasetFactory: () => Promise<IMockDataSet>;

    private dataset: IMockDataSet | undefined;

    getURL(): string | undefined {
        return undefined;
    }

    // get the MMT Version
    async getMMTVersion(): Promise<IMMTVersionInfo> {
        return this.loadDataSet().then(d => d.version);
    }

    // #region "Getters"

    // retrieves all groups from the dataset
    async getGroups(): Promise<IGroupRef[]> {
        return this.loadDataSet().then(ds => ds.groups.map(o => LazyMockClient.cleanGroupRef(o, ds)));
    }

    // given a URI, returns an object
    async getURI(uri: URI): Promise<IReferencable | undefined> {
        let kind = "";

        return this.getObjectOfType<IReferencable>((ds: IMockDataSet) => {
            const groups = ds.groups.find(g => g.id === uri);
            if (groups) {
                kind = "group";

                return groups;
            }

            const archives = ds.archives.find(a => a.id === uri);
            if (archives) {
                kind = "archive";

                return archives;
            }

            const documents = ds.documents.find(d => d.id === uri);
            if (documents) {
                kind = "document";

                return documents;
            }

            const opaques = ds.opaques.find(o => o.id === uri);
            if (opaques) {
                kind = "opaque";

                return opaques;
            }

            const modules = ds.modules.find(m => m.id === uri);
            if (modules) {
                kind = "modules";

                return modules;
            }

            return undefined;
        }, kind);
    }

    // gets a group from the mock dataset
    async getGroup(id: string): Promise<IGroup | undefined> {
        return this.getObjectOfType<IGroup>((ds: IMockDataSet) => ds.groups.find(g => g.id === id), "group");
    }

    // gets a group from the mock dataset
    async getTag(id: string): Promise<ITag | undefined> {
        const theMockTag = id.startsWith("@") ? { id, name: id.substring(1) } : undefined;

        return this.getObjectOfType<ITag>(() => theMockTag, "tag");
    }

    // gets an archive from the mock dataset
    async getArchive(id: string): Promise<IArchive | undefined> {
        return this.getObjectOfType<IArchive>((ds: IMockDataSet) => ds.archives.find(a => a.id === id), "archive");
    }

    // gets a document from the mock dataset
    async getDocument(id: string): Promise<IDocument | undefined> {
        return this.getObjectOfType<IDocument>((ds: IMockDataSet) => ds.documents.find(d => d.id === id), "document");
    }

    // gets a module from the mock dataset
    async getModule(id: string): Promise<IModule | undefined> {
        return this.getObjectOfType<IModule>((ds: IMockDataSet) => ds.modules.find(m => m.id === id), "module");
    }

    // gets a declaration from the mock dataset
    async getDeclaration(id: string): Promise<IDeclaration | undefined> {
        return this.getObjectOfType<IDeclaration>(
            (ds: IMockDataSet) => ds.declarations.find(d => d.id === id),
            "declaration",
        );
    }

    // #endregion

    // #region "Dataset"

    // loads the dataset
    private async loadDataSet(): Promise<IMockDataSet> {
        // if we already fetched the dataset
        // we can return it immediatly
        if (this.dataset !== undefined) return this.dataset;

        // else we need to fetch it
        this.dataset = await this.datasetFactory();

        return this.dataset;
    }

    /**
     * gets an object matching a filter from the data set
     * or returns an error message
     * @param getter function to get object from dataset
     */
    private async getObjectOfType<T extends IApiObject>(
        getter: (data: IMockDataSet) => IMockObject | undefined,
        kind: string,
    ): Promise<T | undefined> {
        const ds = await this.loadDataSet();
        const obj = getter(ds);
        if (obj !== undefined) return LazyMockClient.cleanAny<T>(kind, obj, ds);
        else return undefined;
    }

    // #endregion

    // #region "Cleaners"

    private static MockNotFoundError(id: string, where: string) {
        return new Error(`Mock Dataset: Can not find ${id} in dataset.${where}`);
    }

    private static cleanAny<T extends IApiObject>(kind: string, obj: IMockObject, ds: IMockDataSet): T {
        let co: unknown; // cleaned object
        switch (kind) {
            case "group":
                co = this.cleanGroup(obj, ds);
                break;
            case "tag":
                co = this.cleanTag(obj, ds);
                break;
            case "archive":
                co = this.cleanArchive(obj, ds);
                break;
            case "document":
                co = this.cleanDocument(obj, ds);
                break;
            case "opaque":
                co = this.cleanOpaqueElement(obj, ds);
                break;
            case "module":
                co = this.cleanModule(obj, ds);
                break;
            case "declaration":
                co = this.cleanDeclaration(obj, ds);
                break;
            default:
                console.warn(`Mock Dataset: Got object of unknown kind ${kind}, skipping cleanup. `);
                co = obj;
        }

        // this cast is type safe because of clean* methods do not change type
        return co as T;
    }

    private static cleanGroupRef(group: IMockReference, ds: IMockDataSet): IGroupRef {
        const actual = ds.groups.find(g => g.id === group.id);
        if (!actual) throw LazyMockClient.MockNotFoundError(group.id, "groups");

        return {
            kind: "group",
            parent: null,
            ref: true,

            id: actual.id,
            name: actual.name,
            title: actual.title,
            teaser: actual.teaser,
        };
    }

    private static cleanTagRef(tag: IMockReference): ITagRef {
        if (!tag.id.startsWith("@")) throw LazyMockClient.MockNotFoundError(tag.id, "tags");

        return {
            kind: "tag",
            parent: null,
            ref: true,

            id: tag.id,
            name: tag.id.substr(1),
        };
    }

    private static cleanArchiveRef(archive: IMockReference, ds: IMockDataSet): IArchiveRef {
        const actual = ds.archives.find(a => a.id === archive.id);
        if (!actual) throw LazyMockClient.MockNotFoundError(archive.id, "archives");
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

    private static cleanDocumentParentRef(ref: IMockReference, ds: IMockDataSet): IDocumentParentRef {
        // if we can find a document reference, return a document
        const docRef = ds.documents.find(d => d.id === ref.id);
        if (docRef !== undefined) return this.cleanDocumentRef(ref, ds);
        // else try and find an archive reference
        else return this.cleanArchiveRef(ref, ds);
    }

    private static cleanDocumentRef(document: IMockReference, ds: IMockDataSet): IDocumentRef {
        const actual = ds.documents.find(d => d.id === document.id);
        if (!actual) throw LazyMockClient.MockNotFoundError(document.id, "documents");
        const parent = this.cleanDocumentParentRef(actual.parent, ds);

        return {
            kind: "document",
            parent,
            ref: true,

            name: actual.name,
            id: actual.id,
        };
    }

    private static cleanOpaqueElementRef(opaque: IMockReference, ds: IMockDataSet): IOpaqueElementRef {
        const actual = ds.opaques.find(o => o.id === opaque.id);
        if (!actual) throw LazyMockClient.MockNotFoundError(opaque.id, "opaques");
        const parent = this.cleanDocumentRef(actual.parent, ds);

        return {
            kind: "opaque",
            parent,
            ref: true,

            name: actual.name,
            id: actual.id,
        };
    }

    private static cleanModuleRef(mod: IMockReference, ds: IMockDataSet): IModuleRef {
        const actual = ds.modules.find(m => m.id === mod.id);
        if (!actual) throw LazyMockClient.MockNotFoundError(mod.id, "modules");

        return {
            kind: "module",
            parent: null,
            ref: true,

            name: actual.name,
            id: actual.id,
        };
    }

    private static cleanDeclarationRef(declaration: IMockReference, ds: IMockDataSet): IDeclarationRef {
        const actual = ds.declarations.find(d => d.id === declaration.id);
        if (!actual) throw LazyMockClient.MockNotFoundError(declaration.id, "declarations");
        const parent = this.cleanModuleRef(actual.parent, ds);

        return {
            kind: "declaration",
            parent,
            ref: true,

            declaration: actual.declaration.kind,

            name: actual.name,
            id: actual.id,
        };
    }

    private static cleanGroup(group: IMockReference, ds: IMockDataSet): IGroup {
        const ref = this.cleanGroupRef(group, ds);
        const actual = ds.groups.find(g => g.id === group.id);
        if (!actual) throw LazyMockClient.MockNotFoundError(group.id, "groups");

        const archives = ds.archives.filter(a => a.parent.id === group.id).map(a => this.cleanArchiveRef(a, ds));

        return {
            ...ref,
            ref: false,

            description: actual.description,
            responsible: actual.responsible,
            declarations: archives,
            statistics: actual.statistics,
        };
    }

    private static cleanTag(tag: IMockReference, ds: IMockDataSet): ITag {
        const ref = this.cleanTagRef(tag);
        const archives = ds.archives.filter(a => a.tags.indexOf(ref.name) !== -1).map(a => this.cleanArchiveRef(a, ds));

        return {
            ...ref,
            ref: false,

            declarations: archives,
        };
    }

    private static findNarrativeChildren(
        parent: IMockReference,
        moduleChildren: IMockReference[],
        ds: IMockDataSet,
    ): INarrativeElement[] {
        // Note: This does not maintain order
        const opaques = ds.opaques.filter(o => o.parent.id === parent.id).map(o => this.cleanOpaqueElement(o, ds));

        const documents = ds.documents.filter(d => d.parent.id === parent.id).map(d => this.cleanDocument(d, ds));

        const modules = moduleChildren
            .map(m => ds.modules.find(dm => dm.id === m.id))
            .filter((m): m is IMockModule => m !== undefined)
            .map(m => this.cleanModuleRef(m, ds));

        return ([] as INarrativeElement[]).concat(opaques, documents, modules);
    }

    private static cleanArchive(archive: IMockReference, ds: IMockDataSet): IArchive {
        const ref = this.cleanArchiveRef(archive, ds);
        const actual = ds.archives.find(a => a.id === archive.id);
        if (!actual) throw LazyMockClient.MockNotFoundError(archive.id, "archives");

        const children = this.findNarrativeChildren(archive, actual.modules, ds);
        let narrativeRoot: IDocument;

        // if we have more than one child, try the first valid one or fail
        if (children.length !== 1) {
            console.warn(`Mock Dataset: Expected exactly one child of ${archive.id}, found ${children.length}`);

            narrativeRoot = (children.find((c: INarrativeElement) => c.kind === "document") || {}) as IDocument;

            console.warn(`Mock Dataset: child is of kind ${narrativeRoot.kind}`);
        } else narrativeRoot = children[0] as IDocument;

        const tags = actual.tags.map(ts => this.cleanTagRef({ id: `@${ts}` }));

        return {
            ...ref,
            ref: false,

            tags,
            description: actual.description,
            responsible: actual.responsible,
            narrativeRoot,
            statistics: actual.statistics,
        };
    }

    private static cleanDocument(document: IMockReference, ds: IMockDataSet): IDocument {
        const ref = this.cleanDocumentRef(document, ds);
        const actual = ds.documents.find(d => d.id === document.id);
        if (!actual) throw LazyMockClient.MockNotFoundError(document.id, "documents");

        const decls = this.findNarrativeChildren(document, actual.modules, ds);

        return {
            ...ref,
            ref: false,

            tags: actual.tags,
            declarations: decls,
            statistics: actual.statistics,
        };
    }

    private static cleanOpaqueElement(opaque: IMockReference, ds: IMockDataSet): IOpaqueElement {
        const ref = this.cleanOpaqueElementRef(opaque, ds);
        const actual = ds.opaques.find(o => o.id === opaque.id);
        if (!actual) throw LazyMockClient.MockNotFoundError(opaque.id, "opaques");
        // const parent = this.cleanNarrativeParentRef(actual.parent, ds);

        return {
            ...ref,
            ref: false,

            content: actual.content,
            contentFormat: actual.contentFormat,
        };
    }

    private static cleanModule(mod: IMockReference, ds: IMockDataSet): IModule {
        const ref = this.cleanModuleRef(mod, ds);
        const actual = ds.modules.find(m => m.id === mod.id);
        if (!actual) throw LazyMockClient.MockNotFoundError(mod.id, "modules");

        let inner: IModule["mod"];
        if (actual.mod.kind === "theory")
            if (actual.mod.meta) {
                const thyT = this.cleanModuleRef(actual.mod.meta, ds);

                inner = {
                    kind: "theory",
                    meta: thyT as IModuleRef & { mod: "theory" },
                };
            } else
                inner = {
                    kind: "theory",
                };
        else {
            const domainT = this.cleanModuleRef(actual.mod.domain, ds);
            const codomainT = this.cleanModuleRef(actual.mod.codomain, ds);

            inner = {
                kind: "view",
                domain: domainT as IModuleRef & { mod: "theory" },
                codomain: codomainT as IModuleRef & { mod: "theory" },
            };
        }

        const declarations = ds.declarations
            .filter(d => d.parent.id === actual.id)
            .map(d => LazyMockClient.cleanDeclarationRef(d, ds));

        return {
            ...ref,
            ref: false,

            mod: inner,
            declarations,
        };
    }

    private static cleanDeclaration(declaration: IMockReference, ds: IMockDataSet): IDeclaration {
        const ref = this.cleanDeclarationRef(declaration, ds);
        const actual = ds.declarations.find(d => d.id === declaration.id);
        if (!actual) throw LazyMockClient.MockNotFoundError(declaration.id, "declarations");

        const declarations = ds.declarations
            .filter(d => d.parent.id === actual.id)
            .map(d => this.cleanDeclarationRef(d, ds));

        let inner: IDeclaration["declaration"];
        if (actual.declaration.kind === "nested") {
            const modT = this.cleanModuleRef(actual.declaration.mod, ds);
            if (!modT) throw LazyMockClient.MockNotFoundError(actual.declaration.id, "modules");

            inner = {
                kind: "nested",
                mod: modT,
            };
        } else inner = actual.declaration;

        return {
            ...ref,
            ref: false,

            declaration: inner,

            components: actual.components,
            declarations,
        };
    }

    // #endregion
}

export default class MockClient extends LazyMockClient {
    constructor() {
        super(
            async (): Promise<IMockDataSet> => {
                // because of https://github.com/microsoft/TypeScript/issues/31920
                // we need to force cast here!
                const mock = await import("./mock.json");

                return (mock.default as unknown) as IMockDataSet;
            },
        );
    }
}
