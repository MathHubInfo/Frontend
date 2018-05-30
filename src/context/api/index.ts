/** This file contains type definitions for all OMDOC types exposed by the MMT API */

/** any object returned by the public api */
export type IApiObject = IReferencable | IOpaqueElement;

/** any object that is referencable */
export type IReferencable = IGroup | IArchive | IDocument | IModule;

/** any concrete reference */
export type IReference = IGroupRef | IArchiveRef | IDocumentRef | IModuleRef;

//
// GROUP
//

interface IGroupItem extends IAPIObjectItem {
    kind: "group";
    parent: undefined;

    /** a machine-readable ID of the group */
    id: string;

    /** human-readable title of the group */
    title: HTML;
    /** a short teaser description of the group */
    teaser: HTML;
}

/** a reference to a MathHub Group */
export interface IGroupRef extends IGroupItem {
    ref: true;
}

/** a full description of a MathHub Group */
export interface IGroup extends IGroupItem {
    ref: false;

    /** the description of the group item */
    description: HTML;
    /** a list of emails of people responsible for this group */
    responsible: string[];
    /** a list of archives contained in this group */
    archives: IArchiveRef[];
}

//
// ARCHIVE
//

interface IArchiveItem extends IAPIObjectItem {
    kind: "archive";
    parent: IGroupRef;

    /** the id of the archive $parent.id/$name */
    id: string;
    /** the name of the archive */
    name: string;

    /** the human-readable title of this archive */
    title: HTML;
    /** short, human-readable description of this archive */
    teaser: HTML;
}

/** a reference to a MathHub Archive */
export interface IArchiveRef extends IArchiveItem {
    ref: true;
}

/** a full description of a MathHub Archive */
export interface IArchive extends IArchiveItem {
    ref: false;

    /** a long, human-readable description of an archive */
    description: HTML;
    /** a list of emails of people responsible for this group */
    responsible: string[];

    /** the narrative content contained in this archive */
    narrativeRoot: INarrativeElement[];
}

//
// Narration
//
/** a narrative element inside an archive */
export type INarrativeElement = IOpaqueElement | IDocument | IModuleRef | URI; // TODO: Generalize IModuleRef properly

/** a reference to the parent of a narrative element */
type INarrativeParentRef = IArchiveRef | IDocumentRef;

interface IDocumentItem extends IAPIObjectItem {
    kind: "document";
    parent: INarrativeParentRef;

    /** the name of this document */
    name: string;
    /** the uri of this document */
    id: URI;
}

/** a reference to an OMDOC Document */
export interface IDocumentRef extends IDocumentItem {
    ref: true;
}

/** a document of content */
export interface IDocument extends IDocumentItem {
    ref: false;

    /** a set of declarations */
    decls: INarrativeElement[];
}

/** an opaque element */
export interface IOpaqueElement extends IAPIObjectItem {
    kind: "opaque";
    ref: false;

    id: undefined;

    /** the parent of this IOpaqueElement */
    parent: INarrativeParentRef;

    /** the text contained in this IOpaqueElement */
    text: string;
}

//
// CONTENT
//
interface IModuleItem extends IAPIObjectItem {
    kind: "theory" | "view";
    parent: INarrativeParentRef;

    /** name of the module */
    name: string;

    /** the uri of this module */
    id: URI;
}

/** a reference to a module */
export type IModuleRef = ITheoryRef | IViewRef;

interface IModuleCommonRef extends IModuleItem {
    ref: true;
}

/** a reference to a theory */
export interface ITheoryRef extends IModuleCommonRef {
    kind: "theory";
}

/** a reference to a view */
export interface IViewRef extends IModuleCommonRef {
    kind: "view";
}

/** an actual module, consisting of a theory or a view */
export type IModule = ITheory | IView;

interface IModuleCommon extends IModuleItem {
    ref: false;

    // TODO: we eve

    /** presentation of this module as HTML */
    presentation: HTML;

    /** source code of this module, if available */
    source?: string;
}

/** a description of a theory */
export interface ITheory extends IModuleCommon {
    kind: "theory";

    /** the meta theory of this reference */
    meta?: ITheoryRef;
}

/** a description of a view */
export interface IView extends IModuleCommon {
    kind: "view";

    /** the domain of this view */
    domain: ITheoryRef;
    /** the co-domain of this view */
    codomain: ITheoryRef;
}

//
// Helper types
//

/** any object exposed by the API */
interface IAPIObjectItem {
    /** the kind of object that is returned */
    kind: "group" | "archive" | "document" | "opaque" | "theory" | "view";

    id?: string | URI;

    /** weather this object is a reference or a full description */
    ref: boolean;
}

/** a URL */
export type URI = string;

/** anything that could be HTML */
export type HTML = string;
