import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import intl from "react-intl-universal";
import getMathHubConfig from "../../src/context";
import { IGlossaryEntry, IsKnownLanguage, knownLanguages, TKnownLanguages } from "../../src/context/GlossaryClient";
import { IGlossaryState } from "../../src/theming/Pages/Applications/IGlossaryProps";
import ImplicitParameters from "../../src/utils/ImplicitParameters";

const ActionHeader = dynamic(() => import("../../src/theming/Layout/ActionHeader"));
const LayoutBody = dynamic(() => import("../../src/theming/Layout/LayoutBody"));

const PageApplicationsGlossary = dynamic(() => import("../../src/theming/Pages/Applications/PageApplicationsGlossary"));

interface IGlossaryProps {
    initial: Partial<IGlossaryState>;
    entries: IGlossaryEntry[];
}

export default class Glossary extends React.Component<IGlossaryProps, IGlossaryState> {
    static implicits = new ImplicitParameters<IGlossaryState>(
        { language: null },
        { language: ImplicitParameters.validated(IsKnownLanguage, knownLanguages[0]) },
    );

    static async getInitialProps({ query }: NextPageContext): Promise<IGlossaryProps> {
        const entries = await getMathHubConfig().glossaryClient.loadAll();
        const initial = Glossary.implicits.readImplicits(query);

        return { entries, initial };
    }

    state = { language: knownLanguages[0], ...this.props.initial };

    async componentDidUpdate(_: IGlossaryProps, prevState: IGlossaryState) {
        return Glossary.implicits.updateImplicits(this.state, prevState);
    }

    async componentDidMount() {
        return Glossary.implicits.setImplicits(this.state);
    }


    render() {
        const { description, language } = this.state;
        const header = <ActionHeader description={description} />;
        // filter all the entries by those available in the selected language
        const entries = this.props.entries.filter(e =>
            Object.keys(e.kwd).includes(language) && Object.keys(e.def).includes(language));

        return (
            <LayoutBody crumbs={[{ href: "/", title: intl.get("home") }]} title={[intl.get("glossary")]}>
                <PageApplicationsGlossary
                    header={header}
                    knownLanguages={knownLanguages}
                    language={language}
                    entries={entries}
                    changeLanguage={this.changeLanguage}
                />
            </LayoutBody>
        );
    }

    private readonly changeLanguage = (language: TKnownLanguages) => this.setState({ language: language });
}
