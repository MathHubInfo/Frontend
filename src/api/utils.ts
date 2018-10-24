import {
    IApiObject,
    IArchive,
    IArchiveRef,
    IDocument,
    IDocumentRef,
    IGroup,
    IGroupRef,
    IOpaqueElement,
    IOpaqueElementRef,
    IReferencable,
    IReference,
    ITheory,
    ITheoryRef,
    IView,
    IViewRef,
} from "./index";

/** turns any object returned from the API into a reference */
export function AnyToRef(obj: IApiObject): IReference {
    if (obj.ref) {
        return obj;
    } else {
        return ObjectToRef(obj);
    }
}

/** turns an object into a reference */
export function ObjectToRef(obj: IReferencable): IReference {
    if (obj.kind === "group") {
        return GroupObjectToRef(obj);
    } else if (obj.kind === "archive") {
        return ArchiveObjectToRef(obj);
    } else if (obj.kind === "document") {
        return DocumentObjectToRef(obj);
    } else if (obj.kind === "opaque") {
        return OpaqueElementObjectToRef(obj);
    } else if (obj.kind === "view") {
        return ViewObjectToRef(obj);
    } else if (obj.kind === "theory") {
        return TheoryObjectToRef(obj);
    }

    throw new Error("Invalid IReferencable passed. ");

}

/** turns a group into a reference */
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

/** turns an archive into a reference */
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

/** turns a document into a reference */
export function DocumentObjectToRef(doc: IDocument): IDocumentRef {
    return {
        kind: "document",
        parent: doc.parent,
        ref: true,

        id: doc.id,
        name: doc.name,
    };
}

/** turns an OpaqueElement into a reference */
export function OpaqueElementObjectToRef(opaque: IOpaqueElement): IOpaqueElementRef {
    return {
        kind: "opaque",
        parent: opaque.parent,
        ref: true,

        id: opaque.id,
        name: opaque.name,
    };
}

/** turns a view into a reference */
export function ViewObjectToRef(view: IView): IViewRef {
    return {
        kind: "view",
        parent: view.parent,
        ref: true,

        id: view.id,
        name: view.name,
    };
}

/** turns a theory into a reference */
export function TheoryObjectToRef(theory: ITheory): ITheoryRef {
    return {
        kind: "theory",
        parent: theory.parent,
        ref: true,

        id: theory.id,
        name: theory.name,
    };
}
