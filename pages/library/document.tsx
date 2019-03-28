import { NextContext } from "next";

import * as React from "react";
import { debounce } from "ts-debounce";

import getDerivedParameter, { failed, IDerivedParameter, statusCode } from "../../src/utils/getDerivedParameter";

import getContext from "../../src/context";
import { IDeclaration, IDocument, IModule } from "../../src/context/LibraryClient/objects";

import { INarrativeElementProps } from "../../src/lib/library/INarrativeElementProps";
import NarrativeElement from "../../src/lib/library/NarrativeElement";
import { crumbs, headerProps } from "../../src/lib/library/utils";

import LayoutBody from "../../src/theming/Layout/LayoutBody";
import LayoutFailure from "../../src/theming/Layout/LayoutFailure";
import LibraryItemHeader from "../../src/theming/Layout/LibraryItemHeader";
import PageDocument from "../../src/theming/Pages/Library/PageDocument";

import { Omit } from "../../src/types/lib";
import { BooleanArrayStore } from "../../src/utils/DataStore";
import { withDebug } from "../../src/utils/withDebug";

import ImplicitParameters from "../../src/utils/ImplicitParameters";


type IDocumentProps = IDerivedParameter<IDocument> & {
    initial: Partial<IDocumentState>;
};

interface IDocumentState {
    expandedModules: string[];
    expandedDeclarations: string[];
}

export default class Document extends React.Component<IDocumentProps, IDocumentState> {
    static implicits = new ImplicitParameters<IDocumentState>(
        { expandedModules: "modules", expandedDeclarations: "declarations" },
        {
            expandedModules: ImplicitParameters.first<string[]>(x => x.split(","), []),
            expandedDeclarations: ImplicitParameters.first<string[]>(x => x.split(","), []),
        },
        {
            expandedModules: x => x.join(","),
            expandedDeclarations: x => x.join(","),
        },
    );

    static async getInitialProps({ res, query }: NextContext): Promise<IDocumentProps> {
        const derived = await getDerivedParameter(
            "id",
            async (id: string) => getContext().libraryClient.getDocument(id),
            query,
            res,
        );

        return { ...derived, initial: Document.implicits.readImplicits(query) };
    }
    static crumbs = [{ href: "/", title: "Home" }, { href: "/library", title: "Library" }];

    state: IDocumentState = { expandedModules: [], expandedDeclarations: [], ...this.props.initial };

    private readonly debouncedUpdate = withDebug(debounce(() => this.forceUpdate(), 500), "forceUpdate");
    private readonly mstore = new BooleanArrayStore<IModule>(
        () => this.state.expandedModules,
        update => this.setState(({ expandedModules }) => ({ expandedModules: update(expandedModules) })),
        async id => getContext().libraryClient.getModule(id),
        this.debouncedUpdate,
    );
    private readonly dstore = new BooleanArrayStore<IDeclaration>(
        () => this.state.expandedDeclarations,
        update => this.setState(({ expandedDeclarations }) => ({ expandedDeclarations: update(expandedDeclarations) })),
        async id => getContext().libraryClient.getDeclaration(id),
        this.debouncedUpdate,
    );

    async componentDidUpdate(_: IDocumentProps, prevState: IDocumentState) {
        return Document.implicits.updateImplicits(this.state, prevState);
    }

    async componentDidMount() {
        return Document.implicits.setImplicits(this.state);
    }

    componentWillUnmount() {
        this.mstore.destroy();
        this.dstore.destroy();
    }

    render() {
        if (failed(this.props)) return (
            <LayoutFailure
                crumbs={Document.crumbs}
                statusCode={statusCode(this.props.status)}
                status={this.props.status}
            />
        );

        const { name, declarations: decls } = this.props.item;
        const header = <LibraryItemHeader {...headerProps(this.props.item)} />;

        const nprops: Omit<INarrativeElementProps, "children"> = {
            preloadModule: this.mstore.preload,
            preloadDeclaration: this.dstore.preload,
            isModuleExpanded: this.mstore.contains,
            isDeclarationExpanded: this.dstore.contains,
            toggleModuleExpansion: this.mstore.toggle,
            toggleDeclarationExpansion: this.dstore.toggle,
            getModule: this.mstore.getElement,
            getDeclaration: this.dstore.getElement,
        };

        return (
            <LayoutBody crumbs={[...Document.crumbs, ...crumbs(this.props.item)]} title={[name]}>
                <PageDocument header={header} item={this.props.item}>
                    {decls.map(d => <NarrativeElement {...nprops} key={d.id}>{d}</NarrativeElement>)}
                </PageDocument>
            </LayoutBody>
        );
    }
}
