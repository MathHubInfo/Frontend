import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import intl from "react-intl-universal";
import { debounce } from "ts-debounce";
import getMathHubConfig from "../../src/context";
import { IArchive, IDeclaration, IModule } from "../../src/context/LibraryClient/objects";
import { INarrativeElementProps } from "../../src/library/NarrativeElement";
import { crumbs, headerProps } from "../../src/library/utils";
import { BooleanArrayStore } from "../../src/utils/DataStore";
import GetDerivedParameter, { failed, IDerivedParameter, statusCode } from "../../src/utils/GetDerivedParameter";
import ImplicitParameters from "../../src/utils/ImplicitParameters";
import { WithDebug } from "../../src/utils/WithDebug";

const NarrativeElement = dynamic(() => import("../../src/library/NarrativeElement"));
const ActionHeader = dynamic(() => import("../../src/theming/Layout/ActionHeader"));
const LayoutBody = dynamic(() => import("../../src/theming/Layout/LayoutBody"));
const LayoutFailure = dynamic(() => import("../../src/theming/Layout/LayoutFailure"));

const PageArchive = dynamic(() => import("../../src/theming/Pages/Library/PageArchive"));

type IArchiveProps = IDerivedParameter<IArchive> & {
    initial: Partial<IArchiveState>;
};

interface IArchiveState {
    expandedModules: string[];
    expandedDeclarations: string[];
}

export default class Archive extends React.Component<IArchiveProps, IArchiveState> {
    static implicits = new ImplicitParameters<IArchiveState>(
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

    static async getInitialProps({ res, query }: NextPageContext): Promise<IArchiveProps> {
        const derived = await GetDerivedParameter(
            "id",
            async (id: string) => getMathHubConfig().libraryClient.getArchive(id),
            query,
            res,
        );

        return { ...derived, initial: Archive.implicits.readImplicits(query) };
    }
    state: IArchiveState = { expandedModules: [], expandedDeclarations: [], ...this.props.initial };

    private readonly debouncedUpdate = WithDebug(
        debounce(() => this.forceUpdate(), 500),
        "forceUpdate",
    );
    private readonly mstore = new BooleanArrayStore<IModule>(
        () => this.state.expandedModules,
        update => this.setState(({ expandedModules: expanded }) => ({ expandedModules: update(expanded) })),
        async id => getMathHubConfig().libraryClient.getModule(id),
        this.debouncedUpdate,
    );
    private readonly dstore = new BooleanArrayStore<IDeclaration>(
        () => this.state.expandedDeclarations,
        update => this.setState(({ expandedDeclarations }) => ({ expandedDeclarations: update(expandedDeclarations) })),
        async id => getMathHubConfig().libraryClient.getDeclaration(id),
        this.debouncedUpdate,
    );

    async componentDidUpdate(_: IArchiveProps, prevState: IArchiveState) {
        return Archive.implicits.updateImplicits(this.state, prevState);
    }

    async componentDidMount() {
        return Archive.implicits.setImplicits(this.state);
    }

    componentWillUnmount() {
        this.mstore.destroy();
        this.dstore.destroy();
    }

    render() {
        const breadcrumbs = [
            { href: "/", title: intl.get("home") },
            { href: "/library", title: intl.get("library") },
        ];
        if (failed(this.props))
            return (
                <LayoutFailure
                    crumbs={breadcrumbs}
                    statusCode={statusCode(this.props.status)}
                    status={this.props.status}
                />
            );

        const {
            description,
            name,
            narrativeRoot: { declarations: decls },
        } = this.props.item;
        const header = <ActionHeader {...headerProps(this.props.item, { description })} />;

        const nprops: Omit<INarrativeElementProps, "children"> = {
            preloadModule: this.mstore.preload,
            preloadDeclaration: this.dstore.preload,
            isModuleExpanded: this.mstore.contains,
            isDeclarationExpanded: this.dstore.contains,
            toggleModuleExpansion: this.mstore.toggle,
            toggleDeclarationExpansion: this.dstore.toggle,
            getModule: this.mstore.get,
            getDeclaration: this.dstore.get,
        };

        return (
            <LayoutBody crumbs={[...breadcrumbs, ...crumbs(this.props.item)]} title={[name]}>
                <PageArchive header={header} item={this.props.item}>
                    {decls.map(d => (
                        <NarrativeElement {...nprops} key={d.id}>
                            {d}
                        </NarrativeElement>
                    ))}
                </PageArchive>
            </LayoutBody>
        );
    }
}
