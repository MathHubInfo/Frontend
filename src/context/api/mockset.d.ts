import {
    HTML,
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
    IOpaqueElementRef,
} from "./index";

/**
 * The Mock Data Set contained in mock.json
 *
 * The type here is only for tsc, the actual type can limit all
 * IReferences to be shallow in the sense of only having the 'id' property.
 *
 * Furthermore, the 'kind' and child atttributes may be omitted where unique.
 */
export interface IMockDataSet {
    groups: IMockGroup[];
    archives: IMockArchive[];

    documents: IMockDocument[];
    opaques: IMockOpaqueElement[];

    modules: IMockModule[];
}

/** a shallow mock reference */
export interface IMockReference {
    id: string;
}

/** a mock object */
export interface IMockObject extends IMockReference {
    parent: IMockReference | null;

    name: string;
}

/** a mocked group */
export interface IMockGroup extends IMockObject {
    parent: IMockReference;

    title: HTML;
    teaser: HTML;

    description: HTML;
    responsible: string[];
}

/** a mocked archive */
export interface IMockArchive extends IMockObject {
    parent: IMockReference;
    
    title: HTML;
    teaser: HTML;

    description: HTML;
    responsible: string[];
}

/** a mocked opaque element */
export interface IMockDocument extends IMockObject {
    parent: IMockReference;
}

/** a mocked opaque element */
export interface IMockOpaqueElement extends IMockObject {
    parent: IMockReference;

    title: HTML;
    text: string;
}

/** a mocked module */
export type IMockModule = IMockTheory | IMockView;

interface IMockTheory extends IMockObject {
    kind: "theory";
    parent: IMockReference;

    presentation: HTML;
    source?: string;

    meta?: IMockReference
}

interface IMockView extends IMockObject {
    kind: "view";
    parent: IMockReference;

    presentation: HTML;
    source?: string;

    domain: IMockReference;
    codomain: IMockReference;
}