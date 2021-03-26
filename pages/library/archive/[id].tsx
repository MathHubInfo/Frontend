import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import { debounce } from "ts-debounce";
import getMathHubConfig from "../../../src/context";
import { IArchive, IDeclaration, IModule } from "../../../src/context/LibraryClient/objects";
import { INarrativeElementProps } from "../../../src/library/NarrativeElement";
import { decode } from "../../../src/utils/base64";
import { BooleanArrayStore } from "../../../src/utils/DataStore";
import ImplicitParameters from "../../../src/utils/ImplicitParameters";
import { WithDebug } from "../../../src/utils/WithDebug";
import { List } from "semantic-ui-react";

const NarrativeElement = dynamic(() => import("../../../src/library/NarrativeElement"));
const Body = dynamic(() => import("../../../src/layout"));

type IArchiveProps = {
    archive: IArchive;
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
        const { archive } = this.props;
        const {
            narrativeRoot: { declarations },
        } = archive;

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
            <Body obj={archive}>
                <List relaxed>
                    {declarations.map(d => (
                        <List.Item key={d.id}>
                            <NarrativeElement {...nprops}>{d}</NarrativeElement>
                        </List.Item>
                    ))}
                </List>
            </Body>
        );
    }
}

export const getServerSideProps = async ({
    params,
    query,
}: GetServerSidePropsContext<{ id: string }>): Promise<GetServerSidePropsResult<IArchiveProps>> => {
    if (params === undefined) return { notFound: true };

    const archive = await getMathHubConfig().libraryClient.getArchive(decode(params.id));
    if (archive === undefined) return { notFound: true };

    const initial = await Archive.implicits.readImplicits(query);

    return {
        props: { archive, initial },
    };
};
