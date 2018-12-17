import {
    HTML,
    IComponent,
    IMMTVersionInfo,
    IModuleRef,
    IStatistic,
} from "../objects";

/**
 * The Mock Data Set contained in library.json
 *
 * The type here is only for tsc, the actual type can limit all
 * IReferences to be shallow in the sense of only having the 'id' property.
 *
 * Furthermore, the 'kind' and child atttributes may be omitted where unique.
 */
export interface IMockDataSet {
    version: IMMTVersionInfo;

    groups: IMockGroup[];
    archives: IMockArchive[];

    documents: IMockDocument[];
    opaques: IMockOpaqueElement[];

    modules: IMockModule[];

    declarations: IMockDeclaration[];
}

// a shallow mock reference
export interface IMockReference {
    id: string;
}

// a mock object
export interface IMockObject extends IMockReference {
    name: string;
}

// a mocked group
export interface IMockGroup extends IMockObject {
    title: HTML;
    teaser: HTML;

    description: HTML;
    responsible: string[];
    statistics: IStatistic[];
}

// a mocked archive
export interface IMockArchive extends IMockObject {
    parent: IMockReference;

    title: HTML;
    teaser: HTML;

    tags: string[];

    description: HTML;
    responsible: string[];
    statistics: IStatistic[];

    modules: IMockReference[];
}

// a mocked opaque element
export interface IMockDocument extends IMockObject {
    parent: IMockReference;
    statistics: IStatistic[];

    modules: IMockReference[];
}

// a mocked opaque element
export interface IMockOpaqueElement extends IMockObject {
    parent: IMockReference;

    contentFormat: string;
    content: string;
}

// a mocked module
export interface IMockModule extends IMockObject {
    parent?: null;
    mod: IMockTheory | IMockView;
}

export interface IMockTheory {
    kind: "theory";
    parent?: null;

    meta?: IMockReference;
}

export interface IMockView {
    kind: "view";
    parent?: null;

    domain: IMockReference;
    codomain: IMockReference;
}


// a mocked declaration
export interface IMockDeclaration extends IMockObject {
    parent: IMockReference;

    declaration: IMockStructure | IMockConstant | IMockRule | IMockNestedModule;
    components: IComponent[];
}

export interface IMockStructure extends IMockObject {
    kind: "structure";
    parent?: null;

    implicit: boolean;
    include: boolean;
}

export interface IMockConstant extends IMockObject {
    kind: "constant";
    parent?: null;

    role?: string;
    alias: string[];
}

export interface IMockRule extends IMockObject {
    kind: "rule";
}

export interface IMockNestedModule extends IMockObject {
    kind: "nested";

    mod: IModuleRef;
}

