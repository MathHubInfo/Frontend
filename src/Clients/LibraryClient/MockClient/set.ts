import {
    HTML,
    IMMTVersionInfo,
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
    components: IMockComponent[];
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

export interface IMockTheory extends IMockObject {
    kind: "theory";
    parent?: null;

    meta?: IMockReference;
}

export interface IMockView extends IMockObject {
    kind: "view";
    parent?: null;

    domain: IMockReference;
    codomain: IMockReference;
}


// a mocked declaration
export interface IMockDeclaration extends IMockObject {
    parent: IMockReference;

    declaration: {
        kind: string;
    };
}

// a mocked component
export interface IMockComponent extends IMockObject {
    parent: IMockReference;

    component: {
        kind: string;
    };
    term: string;
}
