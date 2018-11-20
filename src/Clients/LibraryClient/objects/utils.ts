import {
    IApiObject,
    IArchive,
    IArchiveRef,
    IComponent,
    IComponentRef,
    IDeclaration,
    IDeclarationRef,
    IDocument,
    IDocumentRef,
    IGroup,
    IGroupRef,
    IOpaqueElement,
    IOpaqueElementRef,
    IReferencable,
    IReference,
    ITag,
    ITagRef,
    ITheory,
    ITheoryRef,
    IView,
    IViewRef,
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
        case "view":
            return ViewObjectToRef(obj);
        case "theory":
            return TheoryObjectToRef(obj);
        case "declaration":
            return DeclarationObjectToRef(obj);
        case "component":
            return ComponentObjectToRef(obj);
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
export function ViewObjectToRef(view: IView): IViewRef {
    return {
        kind: "view",
        parent: view.parent,
        ref: true,

        id: view.id,
        name: view.name,
    };
}

// turns a theory into a reference
export function TheoryObjectToRef(theory: ITheory): ITheoryRef {
    return {
        kind: "theory",
        parent: theory.parent,
        ref: true,

        id: theory.id,
        name: theory.name,
    };
}

export function DeclarationObjectToRef(declaration: IDeclaration): IDeclarationRef {
    return {
        kind: "declaration",
        parent: declaration.parent,
        ref: true,

        id: declaration.id,
        name: declaration.name,
    };
}

export function ComponentObjectToRef(component: IComponent): IComponentRef {
    return {
        kind: "component",
        parent: component.parent,
        ref: true,

        id: component.id,
        name: component.name,
    };
}
