import { Omittable } from "../../../types/omittable";
import { HTML, IComponent, IMMTVersionInfo, IModuleRef, IStatistic, TDocumentTags } from "../objects";

/**
 * The Mock Data Set contained in library.json
 *
 * The type here is only for tsc, the actual type can limit all
 * IReferences to be shallow in the sense of only having the 'id' property.
 *
 * Furthermore, the 'kind' and child atttributes may be omitted where unique.
 */
export type IMockDataSet = {
    version: IMMTVersionInfo;

    groups: IMockGroup[];
    archives: IMockArchive[];

    documents: IMockDocument[];
    opaques: IMockOpaqueElement[];

    modules: IMockModule[];

    declarations: IMockDeclaration[];
};

// a shallow mock reference
export type IMockReference = {
    id: string;
};

// a mock object
export type IMockObject = IMockReference & {
    name: string;
};

// a mocked group
export type IMockGroup = IMockObject & {
    title: HTML;
    teaser: HTML;

    description: HTML;
    responsible: string[];
    statistics: IStatistic[];
};

// a mocked archive
export type IMockArchive = IMockObject & {
    parent: IMockReference;

    title: HTML;
    teaser: HTML;

    tags: string[];

    description: HTML;
    responsible: string[];
    statistics: IStatistic[];

    modules: IMockReference[];
};

// a mocked opaque element
export type IMockDocument = Omittable<
    IMockObject & {
        parent: IMockReference;
        statistics: IStatistic[];
        modules: IMockReference[];
    },
    {
        tags: TDocumentTags[];
    }
>;

// a mocked opaque element
export type IMockOpaqueElement = IMockObject & {
    parent: IMockReference;

    contentFormat: string;
    content: string;
};

// a mocked module
export type IMockModule = IMockObject & {
    mod: IMockTheory | IMockView;
};

export type IMockTheory = Omittable<
    {
        kind: "theory";
    },
    {
        meta: IMockReference;
    }
>;

export type IMockView = {
    kind: "view";

    domain: IMockReference;
    codomain: IMockReference;
};

// a mocked declaration
export type IMockDeclaration = IMockObject & {
    parent: IMockReference;

    declaration: IMockStructure | IMockConstant | IMockRule | IMockNestedModule;
    components: IComponent[];
};

export type IMockStructure = IMockObject & {
    kind: "structure";

    implicit: boolean;
    include: boolean;
};

export type IMockConstant = Omittable<
    IMockObject & {
        kind: "constant";

        alias: string[];
    },
    {
        role: string;
    }
>;

export type IMockRule = IMockObject & {
    kind: "rule";
};

export type IMockNestedModule = IMockObject & {
    kind: "nested";

    mod: IModuleRef;
};
