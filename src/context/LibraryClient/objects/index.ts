// This file contains type definitions for all OMDOC types exposed by the MMT API

import { Omittable } from "../../../types/omittable";

// anything returned by the API
export type IResponse = IApiObject | IMMTVersionInfo | IStatistic;

// any object returned by the public api
export type IApiObject = IReferencable | IReference;

// any object that is referencable
export type IReferencable = IGroup | ITag | IArchive | IDocument | IOpaqueElement | IModule | IDeclaration;

// any concrete reference
export type IReference = IHubReference | ITagRef | IDocumentRef | IOpaqueElementRef | IModuleRef | IDeclarationRef;

// a reference to a group or an archive
export type IHubReference = IGroupRef | IArchiveRef;

//
// GROUP
//

interface IGroupItem extends IAPIObjectItem {
    kind: "group";
    parent: null;

    // a machine-readable ID of the group
    id: string;

    // the name of this group, corresponds to id
    name: string;

    // human-readable title of the group
    title: HTML;
    // a short teaser description of the group
    teaser: HTML;
}

// a reference to a MathHub Group
export type IGroupRef = IRef<IGroupItem>;

// a full description of a MathHub Group
export type IGroup = IObj<
    IGroupItem,
    {
        // the description of the group item
        description: HTML;
        // a list of emails of people responsible for this group
        responsible: string[];
        // a list of archives contained in this group
        declarations: IArchiveRef[];

        // statistics of this group
        statistics: IStatistic[];
    }
>;

//
// TAGS
//

interface ITagItem extends IAPIObjectItem {
    kind: "tag";
    parent: null;

    // a machine-readable ID of the tag
    id: string;

    // the name of this tag, corresponds to id
    name: string;
}

// a reference to a MathHub Group
export type ITagRef = IRef<ITagItem>;

// a full description of a MathHub Group
export type ITag = IObj<
    ITagItem,
    {
        ref: false;
        // a list of archives contained in this tag
        declarations: IArchiveRef[];
    }
>;

//
// ARCHIVE
//

interface IArchiveItem extends IAPIObjectItem {
    kind: "archive";
    parent: IGroupRef;

    // the id of the archive $parent.id/$name
    id: string;
    // the name of the archive
    name: string;

    // the human-readable title of this archive
    title: HTML;
    // short, human-readable description of this archive
    teaser: HTML;
}

// a reference to a MathHub Archive
export type IArchiveRef = IRef<IArchiveItem>;

// a full description of a MathHub Archive
export type IArchive = IObj<
    IArchiveItem,
    {
        // a list of tags
        tags: ITagRef[];

        // a long, human-readable description of an archive
        description: HTML;
        // a list of emails of people responsible for this group
        responsible: string[];

        // the narrative content contained in this archive, can be empty for some archives
        narrativeRoot: IDocument;

        // statistics of this archive
        statistics: IStatistic[];
    },
    {
        // the version of an archive
        version: string;
    }
>;

//
// Narration
//
// a narrative element inside an archive
export type INarrativeElement = IOpaqueElement | IDocument | IDocumentRef | IModuleRef | IDeclaration | IDeclarationRef;

// parent of a document
export type IDocumentParentRef = IArchiveRef | IDocumentRef;

interface IDocumentItem extends IAPIObjectItem {
    kind: "document";
    parent: IDocumentParentRef;

    // the name of this document
    name: string;
    // the uri of this document
    id: URI;
}

// a reference to an OMDOC Document
export type IDocumentRef = IRef<IDocumentItem>;

// a document of content
export type IDocument = IObj<
    IDocumentItem,
    {
        // a set of declarations
        declarations: INarrativeElement[];

        // statistics of this document
        statistics: IStatistic[];
    },
    {
        // tags for this document
        tags: TDocumentTags[];
    },
    {
        // source reference of this document
        sourceRef: ISourceReference;
    }
>;

export const knownDocumentTags = ["ipynb-omdoc"] as const;
export type TDocumentTags = typeof knownDocumentTags[number];

interface IOpaqueElementItem extends IAPIObjectItem {
    kind: "opaque";
    parent: IDocumentRef;

    // the id of the opaque
    id: string;
    // the name of the opaque element
    name: string;
}

// a reference to an opaque item
export type IOpaqueElementRef = IRef<IOpaqueElementItem>;

// an opaque element
export type IOpaqueElement = IObj<
    IOpaqueElementItem,
    {
        // the format of the content in this IOpaqueElement
        contentFormat: string;
        // the content contained in this IOpaqueElement
        content: string;
    }
>;

//
// MODULES
//
interface IModuleItem extends IAPIObjectItem {
    kind: "module";
    parent: null;

    // name of the module
    name: string;

    // the uri of this module
    id: URI;
}

export type IModuleRef = IRef<IModuleItem>;

export type IModule = IObj<
    IModuleItem,
    {
        mod: IView | ITheory;

        declarations: IDeclarationRef[];
    }
>;

type ITheoryRef = IModuleRef & { mod: "theory" };
type ITheory = Omittable<
    {
        kind: "theory";
    },
    {
        // the meta theory of this reference
        meta: ITheoryRef;
    }
>;

// type ITheoryRef = IModuleRef & {mod: "view"} // unused
interface IView {
    kind: "view";

    // the domain of this view
    domain: ITheoryRef;
    // the co-domain of this view
    codomain: ITheoryRef;
}

//
// Declarations
//

interface IDeclarationItem extends IAPIObjectItem {
    kind: "declaration";
    parent: IModuleRef;

    // the id of the declaration
    id: string;
    // the name of the declaration
    name: string;
}

// a reference to a declaration
export type IDeclarationRef = IRef<
    IDeclarationItem & {
        // the type of declaration we have
        declaration: IDeclaration["declaration"]["kind"];
    }
>;

// a declaration
export type IDeclaration = IObj<
    IDeclarationItem,
    {
        // information about this declaration
        declaration: IStructure | IConstant | IRule | INestedModule;

        // the components of this declaration
        components: IComponent[];

        // the list of declarations within this declaration
        declarations: IDeclarationRef[];
    }
>;

// an MMT stucture (which may or may not be declared)
interface IStructure {
    kind: "structure";

    // is this structure implicit
    implicit: boolean;
    // is this structure an include
    include: boolean;
}

// an MMT constant
type IConstant = Omittable<
    {
        kind: "constant";

        // aliases of this constant
        alias: string[];
    },
    {
        // the role of this constant (optional)
        role: string;
    }
>;

// an MMT RuleConstant
interface IRule {
    kind: "rule";
}

// a nested module
interface INestedModule {
    kind: "nested";
    mod: IModuleRef;
}

//
// Declaration Components
//

export interface IComponent {
    kind: "component";

    // the name of the declaration component
    name: string;

    // the component-specific information
    component: IOmdocObject | INotation;
}

// a defined object
export interface IOmdocObject {
    kind: "object";
    object: HTML;
}

// a defined notation
export interface INotation {
    kind: "notation";
    notation: string;
}

//
// Other responses
//

// various statistics of an Item
export interface IStatistic {
    key: string;
    value: number;
}

// version information exposed by MMT
export type IMMTVersionInfo = Omittable<
    {
        // the version number (i.e. release number) of MMT
        versionNumber: string;
    },
    {
        // the build date of MMT, seconds since Unix epoch represented as a string
        buildDate: string; // This should really be a number, but Florian's JSON interpretation doesn't do longs
    }
>;

//
// Helper types
//

// a reference to a source
export type ISourceReference = Omittable<
    {
        kind: "source";
        ref: true;

        // archive the file is located in
        parent: IHubReference;
    },
    {
        // the version this source is located in (if any)
        version: string;
    },
    {
        // path of the file relative to the parent
        path: string;
    }
>;

// any object exposed by the API
type IAPIObjectItem = {
    // the kind of object that is returned
    kind: "group" | "archive" | "document" | "opaque" | "module" | "declaration" | "component" | "tag";

    // weather this object is a reference or a full description
    ref: boolean;

    // the id of this object, if any
    id: string;

    // the name of this object, if any
    name: string;

    // parent of this object, if any
    parent: IReference | null;
};

// an item that is fully represented
type IObj<Item, R, O1 = never, O2 = never> = Omittable<
    Item & R & { ref: false },
    O1,
    O2,
    {
        statistics: IStatistic[];
    }
>;

type IRef<Item> = Item & {
    ref: true;
};

// a URL
export type URI = string;

// anything that could be HTML
export type HTML = string;
