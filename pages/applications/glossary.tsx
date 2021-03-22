import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import * as React from "react";
import getMathHubConfig from "../../src/context";
import { IGlossaryEntry, IsKnownLanguage, knownLanguages, TKnownLanguages } from "../../src/context/GlossaryClient";
import { TranslateProps, WithTranslate } from "../../src/locales/WithTranslate";
import ImplicitParameters from "../../src/utils/ImplicitParameters";
import { Button, Card, Container, Grid, Tab, TabProps } from "semantic-ui-react";
import { HTML } from "../../src/context/LibraryClient/objects";
import MHHTML from "../../src/components/MHHTML";

const ActionHeader = dynamic(() => import("../../src/layout/ActionHeader"));
const LayoutBody = dynamic(() => import("../../src/layout/LayoutBody"));

interface IGlossaryProps {
    initial: Partial<IGlossaryState>;
    entries: IGlossaryEntry[];
}

interface IGlossaryState {
    /**
     * the currently selected language
     */
    language: TKnownLanguages;

    // a long, human-readable description of the dictionary
    description?: HTML;
}

class Glossary extends React.Component<IGlossaryProps & TranslateProps, IGlossaryState> {
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

    private changeTab = ({}, { activeIndex }: TabProps) => {
        const active = activeIndex as number;
        this.changeLanguage(knownLanguages[active]);
    };

    render() {
        const { t } = this.props;
        const { description, language } = this.state;

        const panes = knownLanguages.map(l => ({ menuItem: l }));

        // filter all the entries by those available in the selected language
        const entries = this.props.entries.filter(
            e => Object.keys(e.kwd).includes(language) && Object.keys(e.def).includes(language),
        );

        return (
            <LayoutBody crumbs={[{ href: "/", title: t("home") }]} title={[t("glossary")]}>
                <ActionHeader title={t("glossary")} plaintitle description={description} />
                <Tab panes={panes} activeIndex={knownLanguages.indexOf(language)} onTabChange={this.changeTab} />
                <Container>
                    {entries.map(e => (
                        <GlossaryEntry
                            t={t}
                            key={e.id}
                            selectedLanguage={language}
                            entry={e}
                            changeLanguage={this.changeLanguage}
                        />
                    ))}
                </Container>
            </LayoutBody>
        );
    }

    private readonly changeLanguage = (language: TKnownLanguages) => this.setState({ language: language });
}

export default WithTranslate(Glossary);

interface IGlossaryEntryProps {
    selectedLanguage: TKnownLanguages;
    changeLanguage(language: TKnownLanguages): void;
    entry: IGlossaryEntry;
}

class GlossaryEntry extends React.Component<IGlossaryEntryProps & TranslateProps> {
    state = { open: false };
    showSynonyms(kwd: string[]) {
        const { t } = this.props;
        if (kwd.length === 1 || !this.state.open) return null;

        return (
            <div>
                <b>{t("synonyms")}: </b>
                <MHHTML>{kwd.slice(1).join(", ")}</MHHTML>
            </div>
        );
    }
    showDefinition(def: string) {
        if (this.state.open) return <MHHTML>{def}</MHHTML>;

        return null;
    }

    render() {
        const { entry, selectedLanguage, changeLanguage } = this.props;

        // definition of the current entry
        const def = entry.def[selectedLanguage];
        if (!def) return null;

        // keywords in the current entry
        const kwd = entry.kwd[selectedLanguage];
        if (!kwd) return null;

        // known languages
        const available = Object.keys({ ...entry.kwd, ...entry.def }).sort() as TKnownLanguages[];

        return (
            <Card fluid style={{ marginTop: "1em" }} onClick={this.handleClick}>
                <Card.Content>
                    <Card.Header>
                        <Grid>
                            <Grid.Column width={8}>
                                <MHHTML>{kwd[0]}</MHHTML>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Container textAlign="right">
                                    {available.map(l => (
                                        <LanguageLink
                                            key={l}
                                            language={l}
                                            selectedLanguage={selectedLanguage}
                                            changeLanguage={changeLanguage}
                                        />
                                    ))}
                                </Container>
                            </Grid.Column>
                        </Grid>
                    </Card.Header>
                    <Card.Description>
                        {this.showDefinition(def)}
                        {this.showSynonyms(kwd)}
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
    private readonly handleClick = () =>
        this.setState({
            open: !this.state.open,
        });
}

interface ILanguageLinkProps {
    language: TKnownLanguages;
    selectedLanguage: TKnownLanguages;
    changeLanguage(language: TKnownLanguages): void;
}

class LanguageLink extends React.Component<ILanguageLinkProps> {
    render() {
        const { language, selectedLanguage } = this.props;

        if (language === selectedLanguage) return null;
        else
            return (
                <Button onClick={this.changeLanguage} size={"tiny"}>
                    {language}
                </Button>
            );
    }

    private readonly changeLanguage = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        this.props.changeLanguage(this.props.language);
    };
}
