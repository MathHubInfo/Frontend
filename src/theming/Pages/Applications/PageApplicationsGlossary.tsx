import * as React from "react";
import intl from "react-intl-universal";
import { Button, Card, Container, Grid, Tab, TabProps } from "semantic-ui-react";
import { IGlossaryEntry, TKnownLanguages } from "../../../context/GlossaryClient";
import { HTML } from "../../../context/LibraryClient/objects";
import MHHTML from "../../../components/MHHTML";
import { IActionHeaderProps } from "../../Layout/ActionHeader";

export interface IGlossaryState {
    /**
     * the currently selected language
     */
    language: TKnownLanguages;

    // a long, human-readable description of the dictionary
    description?: HTML;
}

interface IGlossaryProps extends IGlossaryState {
    /**
     * A list of all known languages
     */
    knownLanguages: readonly TKnownLanguages[];

    /**
     * The list of known glossary entries
     * available in the selected language
     */
    entries: IGlossaryEntry[];

    // the general information about the Glossary
    header: React.ReactElement<IActionHeaderProps>;

    /**
     * Ref to change the language
     */
    changeLanguage(language: TKnownLanguages): void;
}

export default class PageApplicationsGlossary extends React.Component<IGlossaryProps> {
    languageTabs() {
        const { knownLanguages } = this.props;

        return knownLanguages.map(l => ({ menuItem: l }));
    }
    changeTab = ({ }, { activeIndex }: TabProps) => {
        const { changeLanguage, knownLanguages } = this.props;
        const active = activeIndex as number;
        changeLanguage(knownLanguages[active]);
    }
    render() {
        const { knownLanguages, language: selectedLanguage, changeLanguage, entries } = this.props;

        return (
            <Container>
                <h1>{intl.get("glossary")}</h1>
                {this.props.header}
                <Tab
                    panes={this.languageTabs()}
                    activeIndex={knownLanguages.indexOf(selectedLanguage)}
                    onTabChange={this.changeTab}
                />
                <Container>
                    {entries.map(e => (
                        <GlossaryEntry
                            key={e.id}
                            selectedLanguage={selectedLanguage}
                            entry={e}
                            changeLanguage={changeLanguage}
                        />
                    ))}
                </Container>
            </Container>
        );
    }
}

interface IGlossaryEntryProps {
    selectedLanguage: TKnownLanguages;
    changeLanguage: IGlossaryProps["changeLanguage"];
    entry: IGlossaryEntry;
}

class GlossaryEntry extends React.Component<IGlossaryEntryProps> {
    state = { open: false };
    showSynonyms(kwd: string[]) {
        if (kwd.length === 1 || !this.state.open)
            return null;

        return (
            <div>
                <b>{intl.get("synonyms")}: </b>
                <MHHTML>{kwd.slice(1).join(", ")}</MHHTML>
            </div>
        );
    }
    showDefinition(def: string) {
        if (this.state.open)
            return (<MHHTML>{def}</MHHTML>);

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
    })
}

interface ILanguageLinkProps {
    language: TKnownLanguages;
    selectedLanguage: TKnownLanguages;
    changeLanguage: IGlossaryProps["changeLanguage"];
}

class LanguageLink extends React.Component<ILanguageLinkProps> {
    render() {
        const { language, selectedLanguage } = this.props;

        if (language === selectedLanguage)
            return null;
        else
            return <Button onClick={this.changeLanguage} size={"tiny"}>{language}</Button>;
    }

    private readonly changeLanguage = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        this.props.changeLanguage(this.props.language);
    }
}

