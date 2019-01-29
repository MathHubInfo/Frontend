import * as React from "react";
import { Button, Card, Container, Grid, Tab, TabProps } from "semantic-ui-react";

import { IGlossaryEntry, TKnownLanguages } from "../../../../context/GlossaryClient";

import MHHTML from "../../../../lib/components/MHHTML";
import { IGlossaryProps } from "../../../../theming/Pages/Applications/IGlossaryProps";

export default class Glossary extends React.Component<IGlossaryProps> {
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
                <h1>Glossary</h1>
                <Tab
                    panes={this.languageTabs()}
                    activeIndex={knownLanguages.indexOf(selectedLanguage)}
                    onTabChange={this.changeTab}
                />
                <Container>
                    {entries.map(e =>
                        <GlossaryEntry
                            key={e.id}
                            selectedLanguage={selectedLanguage}
                            entry={e}
                            changeLanguage={changeLanguage}
                        />)}
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
                <b>Synonyms: </b>
                {kwd.slice(1).join(", ")}
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
                                    {available.map(l =>
                                        <LanguageLink
                                            key={l}
                                            language={l}
                                            selectedLanguage={selectedLanguage}
                                            changeLanguage={changeLanguage}
                                        />)}
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
