import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import { debounce } from "ts-debounce";
import getMathHubConfig from "../../../src/context";
import { IDeclaration, IDocument, IModule } from "../../../src/context/LibraryClient/objects";
import { INarrativeElementProps } from "../../../src/library/NarrativeElement";
import { decode } from "../../../src/utils/base64";
import { BooleanArrayStore } from "../../../src/utils/DataStore";
import ImplicitParameters from "../../../src/utils/ImplicitParameters";
import { WithDebug } from "../../../src/utils/WithDebug";
import { List } from "semantic-ui-react";

const NarrativeElement = dynamic(() => import("../../../src/library/NarrativeElement"));
const Body = dynamic(() => import("../../../src/layout"));

interface IDocumentProps {
    document: IDocument;
    initial: Partial<IDocumentState>;
}

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

    state: IDocumentState = { expandedModules: [], expandedDeclarations: [], ...this.props.initial };

    private readonly debouncedUpdate = WithDebug(
        debounce(() => this.forceUpdate(), 500),
        "forceUpdate",
    );
    private readonly mstore = new BooleanArrayStore<IModule>(
        () => this.state.expandedModules,
        update => this.setState(({ expandedModules }) => ({ expandedModules: update(expandedModules) })),
        async id => getMathHubConfig().libraryClient.getModule(id),
        this.debouncedUpdate,
    );
    private readonly dstore = new BooleanArrayStore<IDeclaration>(
        () => this.state.expandedDeclarations,
        update => this.setState(({ expandedDeclarations }) => ({ expandedDeclarations: update(expandedDeclarations) })),
        async id => getMathHubConfig().libraryClient.getDeclaration(id),
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
        const { document } = this.props;
        const { declarations } = document;

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
            <Body obj={document}>
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
}: GetServerSidePropsContext<{ id: string }>): Promise<GetServerSidePropsResult<IDocumentProps>> => {
    if (params === undefined) return { notFound: true };

    const document = await getMathHubConfig().libraryClient.getDocument(decode(params.id));
    if (document === undefined) return { notFound: true };

    const initial = await Document.implicits.readImplicits(query);

    return {
        props: { document, initial },
    };
};
