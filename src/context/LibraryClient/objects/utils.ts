import {
    IApiObject,
    IArchive,
    IArchiveRef,
    IDeclaration,
    IDeclarationRef,
    IDocument,
    IDocumentRef,
    IGroup,
    IGroupRef,
    IModule,
    IModuleRef,
    IOpaqueElement,
    IOpaqueElementRef,
    IReferencable,
    IReference,
    ISourceReference,
    ITag,
    ITagRef,
} from ".";

// turns any object returned from the API into a reference
export function AnyToRef(obj: IApiObject): IReference {
    if (obj.ref) return obj;
    else return ObjectToRef(obj);
}

// turns an object into a reference
export function ObjectToRef(obj: IReferencable): IReference {
    switch (obj.kind) {
        case "group":
            return GroupObjectToRef(obj);
        case "tag":
            return TagObjectToRef(obj);
        case "archive":
            return ArchiveObjectToRef(obj);
        case "document":
            return DocumentObjectToRef(obj);
        case "opaque":
            return OpaqueElementObjectToRef(obj);
        case "module":
            return ModuleObjectToRef(obj);
        case "declaration":
            return DeclarationObjectToRef(obj);
        default:
            throw new Error("Invalid IReferencable passed. ");
    }
}

/**
 * Gets a reference to the source of an object
 */
export function ObjectSource(obj: IReferencable): ISourceReference | undefined {
    switch (obj.kind) {
        case "group":
            return { kind: "source", ref: true, parent: GroupObjectToRef(obj) };
        case "tag":
            return undefined;
        case "archive":
            return { kind: "source", ref: true, parent: ArchiveObjectToRef(obj) };
        case "document":
            return "sourceRef" in obj ? obj.sourceRef : undefined;
        case "opaque":
            return undefined;
        case "module":
            return undefined;
        case "declaration":
            return undefined;
        default:
            throw new Error("Invalid IReferencable passed. ");
    }
}

/**
 * Given an object or a reference, return a list of its parents.
 *
 * Guarantees that the last element of the return value is a reference to the input value
 * @param obj Obj to navigate up with
 */
export function ObjectParents(obj: IReferencable | IReference): IReference[] {
    // create an array of parents
    const parents = [AnyToRef(obj)];

    // and keep adding the parents of each element
    while (parents[0] && parents[0].parent) {
        parents.unshift(parents[0].parent);

        // if we have an archive, the next lower level is a document which *is* the achives content
        // so if it exists, the next level should be removed

        if (parents[0] && parents[1] && parents[0].kind === "archive") parents.splice(1, 1);
    }

    return parents;
}

// turns a group into a reference
export function GroupObjectToRef(group: IGroup): IGroupRef {
    return {
        kind: "group",
        parent: null,
        ref: true,

        id: group.id,
        name: group.name,

        title: group.title,
        teaser: group.teaser,
    };
}

export function TagObjectToRef(tag: ITag): ITagRef {
    return {
        kind: "tag",
        parent: null,
        ref: true,

        id: tag.id,
        name: tag.name,
    };
}

// turns an archive into a reference
export function ArchiveObjectToRef(archive: IArchive): IArchiveRef {
    return {
        kind: "archive",
        parent: archive.parent,
        ref: true,

        id: archive.id,
        name: archive.name,

        title: archive.title,
        teaser: archive.teaser,
    };
}

// turns a document into a reference
export function DocumentObjectToRef(doc: IDocument): IDocumentRef {
    return {
        kind: "document",
        parent: doc.parent,
        ref: true,

        id: doc.id,
        name: doc.name,
    };
}

// turns an OpaqueElement into a reference
export function OpaqueElementObjectToRef(opaque: IOpaqueElement): IOpaqueElementRef {
    return {
        kind: "opaque",
        parent: opaque.parent,
        ref: true,

        id: opaque.id,
        name: opaque.name,
    };
}

// turns a view into a reference
export function ModuleObjectToRef(mod: IModule): IModuleRef {
    return {
        kind: "module",
        parent: mod.parent,
        ref: true,

        id: mod.id,
        name: mod.name,
    };
}

export function DeclarationObjectToRef(declaration: IDeclaration): IDeclarationRef {
    return {
        kind: "declaration",
        parent: declaration.parent,
        ref: true,

        declaration: declaration.declaration.kind,

        id: declaration.id,
        name: declaration.name,
    };
}
