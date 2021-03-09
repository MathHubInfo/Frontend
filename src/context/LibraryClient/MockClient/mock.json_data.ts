// We want to make sure that the mock data set is accurate.
// Thus we need to make a type assertion on the literal.
// But ".json" files never get literal types, they get expanded.
// Hence we use a '.ts' file here.
//
// See https://github.com/microsoft/TypeScript/issues/31920.

import { IMockDataSet } from "./set";

const mock = {
    version: {
        versionNumber: "Mock MMT",
        buildDate: "770880099000",
    },
    groups: [
        {
            id: "smglom",
            name: "smglom",
            title:
                "SMGloM: The <strong>S</strong>emantic <strong>M</strong>ultilingual <strong>Glo</strong>ssary for <strong>M</strong>athematics",
            teaser:
                '<p>The SMGloM is a structured terminology for mathematics. It combines lexical information about the "Words of Mathematics" (in multiple languages) with semantic information about their dependencies. Multiple services can be derived from this terminology, e.g. a <a href="https://mathhub.info/mh/glossary">classical glossary</a> and a <a href="https://mathhub.info/mh/dictionary">math dictionary</a>.</p>',
            description:
                '<p>One of the challenging aspects of mathematical language is its special terminology of technical terms that are defined in various mathematical documents. The SMGloM is a lexical resource that combines the characteristics of dictionaries and glossaries with those of mathematical ontologies. It facilitates a large variety of knowledge management applications without requiring full formalization, the cost of which would be prohibitive. See the license <a href="https://mathhub.info/help/spl0.1.html">here</a>.</p>',
            responsible: ["kohlhase@kwarc.info"],
            statistics: [
                {
                    key: "decl",
                    value: 5,
                },
                {
                    key: "doc",
                    value: 1,
                },
            ],
        },
        {
            id: "MMT",
            name: "MMT",
            title: "MMT",
            teaser: "Core libraries built and maintained by the MMT group",
            description: "<p>This group contains various libraries built and maintained by the MMT group. </p>",
            responsible: ["f.rabe@jacobs-university.de"],
            statistics: [],
        },
        {
            id: "ODK",
            name: "OpenDreamKit",
            title: "OpenDreamKit Meta/System Knowledge",
            teaser:
                "<p>The meta/system knowledge and specifications the  <a href='http://opendreamkit.org'>OpenDreamKit</a> project.</p>",
            description:
                "<p>The meta/system knowledge and specifications the  <a href='http://opendreamkit.org'>OpenDreamKit</a> project.</p>",
            responsible: ["f.rabe@jacobs-university.de"],
            statistics: [
                {
                    key: "decl",
                    value: 647,
                },
                {
                    key: "exp",
                    value: 2,
                },
                {
                    key: "view",
                    value: 3,
                },
                {
                    key: "doc",
                    value: 1,
                },
                {
                    key: "pat",
                    value: 7,
                },
                {
                    key: "theo",
                    value: 4,
                },
                {
                    key: "align",
                    value: 22,
                },
                {
                    key: "any_mor",
                    value: 1,
                },
            ],
        },
    ],
    archives: [
        {
            parent: {
                id: "smglom",
            },
            id: "smglom/staging",
            name: "staging",
            tags: ["groups/smglom"],
            title: "Staging Ground",
            teaser: "Various mathematical concepts to be sorted into SMGloM repositories",
            description:
                "<p>This SMGloM repository is a staging ground for other repositories, it contains glossary modules that either do not fit a repository yet, or are left over from early content development.</p>  ",
            responsible: ["kohlhase@kwarc.info"],
            statistics: [],
            modules: [],
        },
        {
            parent: {
                id: "MMT",
            },
            id: "MMT/example",
            name: "example",
            tags: ["groups/MMT"],
            title: "MMT example archive",
            teaser: "This is an example archive for MMT",
            description: "<p>Stil an example.</p>  ",
            responsible: ["johannes-sebastian-see@fau.de"],
            statistics: [],
            modules: [],
        },
        {
            parent: {
                id: "ODK",
            },
            id: "ODK/Notebooks",
            name: "Notebooks",
            title: "Jupyter Notebooks",
            tags: ["groups/odk"],
            teaser: "Jupyter Notebooks developed by Kai",
            description: "<p>This archive contains the Jupyter notebook used for Demo purposes</p>  ",
            responsible: ["kai-amann@fau.de"],
            statistics: [
                {
                    key: "decl",
                    value: 647,
                },
                {
                    key: "exp",
                    value: 2,
                },
                {
                    key: "view",
                    value: 3,
                },
                {
                    key: "doc",
                    value: 1,
                },
                {
                    key: "pat",
                    value: 7,
                },
                {
                    key: "theo",
                    value: 4,
                },
                {
                    key: "align",
                    value: 22,
                },
                {
                    key: "any_mor",
                    value: 1,
                },
            ],
            modules: [],
        },
    ],
    opaques: [],
    documents: [
        {
            parent: {
                id: "MMT/example",
            },
            id: "exampleRoot",
            name: "exampleRoot",
            statistics: [],
            modules: [],
        },
        {
            parent: {
                id: "ODK/Notebooks",
            },
            tags: ["ipynb-omdoc"],
            id: "notebookRoot",
            name: "notebookRoot",
            statistics: [],
            modules: [],
        },
        {
            parent: {
                id: "smglom/staging",
            },
            id: "stagingRoot",
            name: "stagingRoot",
            statistics: [],
            modules: [],
        },
        {
            parent: {
                id: "https://mathhub.info/mmt/example/fake",
            },
            id: "https://mathhub.info/smglom/staging",
            name: "staging",
            statistics: [],
            modules: [],
        },
        {
            parent: {
                id: "exampleRoot",
            },
            id: "https://mathhub.info/mmt/example/fake",
            name: "fake",
            statistics: [
                {
                    key: "decl",
                    value: 647,
                },
                {
                    key: "exp",
                    value: 2,
                },
                {
                    key: "view",
                    value: 3,
                },
                {
                    key: "doc",
                    value: 1,
                },
                {
                    key: "pat",
                    value: 7,
                },
                {
                    key: "theo",
                    value: 4,
                },
                {
                    key: "align",
                    value: 22,
                },
                {
                    key: "any_mor",
                    value: 1,
                },
            ],
            modules: [{ id: "https://mathhub.info/mmt/example/fake/theory" }],
        },
    ],
    modules: [
        {
            mod: {
                kind: "theory",
            },
            id: "https://mathhub.info/mmt/example/fake/theory",
            name: "fakeTheory",
        },
    ],
    declarations: [],
} as IMockDataSet;

export default mock;
