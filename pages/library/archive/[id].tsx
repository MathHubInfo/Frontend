import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import { debounce } from "ts-debounce";
import getMathHubConfig from "../../../src/context";
import { IArchive, IDeclaration, IModule } from "../../../src/context/LibraryClient/objects";
import { INarrativeElementProps } from "../../../src/library/NarrativeElement";
import { crumbs, headerProps } from "../../../src/library/utils";
import { TranslateProps, WithTranslate } from "../../../src/locales/WithTranslate";
import { decode } from "../../../src/utils/base64";
import { BooleanArrayStore } from "../../../src/utils/DataStore";
import ImplicitParameters from "../../../src/utils/ImplicitParameters";
import { WithDebug } from "../../../src/utils/WithDebug";
import { Container, List } from "semantic-ui-react";
import MHHTML from "../../../src/components/MHHTML";

const NarrativeElement = dynamic(() => import("../../../src/library/NarrativeElement"));
const ActionHeader = dynamic(() => import("../../../src/layout/ActionHeader"));
const LayoutBody = dynamic(() => import("../../../src/layout/LayoutBody"));

type IArchiveProps = {
    archive: IArchive;
    initial: Partial<IArchiveState>;
};

interface IArchiveState {
    expandedModules: string[];
    expandedDeclarations: string[];
}

class Archive extends React.Component<IArchiveProps & TranslateProps, IArchiveState> {
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
        const { t, archive } = this.props;
        const {
            description,
            name,
            narrativeRoot: { declarations },
        } = archive;

        const breadcrumbs = [
            { href: "/", title: t("home") },
            { href: "/library", title: t("library") },
        ];

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
            <LayoutBody crumbs={[...breadcrumbs, ...crumbs(archive)]} title={[name]}>
                <Container>
                    <h1>
                        <MHHTML>{name}</MHHTML>
                    </h1>
                    <ActionHeader {...headerProps(archive, { description })} />
                    <List relaxed>
                        {declarations.map(d => (
                            <List.Item key={d.id}>
                                <NarrativeElement {...nprops}>{d}</NarrativeElement>
                            </List.Item>
                        ))}
                    </List>
                </Container>
            </LayoutBody>
        );
    }
}

export default WithTranslate<IArchiveProps & TranslateProps>(Archive);

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
