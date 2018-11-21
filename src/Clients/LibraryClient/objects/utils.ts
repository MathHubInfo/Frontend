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
    ITag,
    ITagRef,
} from ".";

// turns any object returned from the API into a reference
export function AnyToRef(obj: IApiObject): IReference {
    if (obj.ref)
        return obj;
    else
        return ObjectToRef(obj);
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

        mod: mod.mod.kind,

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
