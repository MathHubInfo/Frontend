import {
    HTML,
    IMMTVersionInfo,
    IStatistic,
} from "../objects";

/**
 * The Mock Data Set contained in mmt.json
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
export type IMockModule = IMockTheory | IMockView;

interface IMockTheory extends IMockObject {
    kind: "theory";
    parent?: null;

    presentation: HTML;
    source?: string;

    meta?: IMockReference;
}

interface IMockView extends IMockObject {
    kind: "view";
    parent?: null;

    presentation: HTML;
    source?: string;

    domain: IMockReference;
    codomain: IMockReference;
}
