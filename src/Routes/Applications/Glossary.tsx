import * as React from "react";
import { Button, Card, Container, Grid, Label, Tab, TabProps } from "semantic-ui-react";

import { IGlossaryEntry, knownLanguages, TKnownLanguages } from "../../Clients/GlossaryClient";
import { HTML, MHTitle } from "../../Components/Fragments";
import { LoadWithSpinner } from "../../Components/Loaders";
import { IMathHubContext, withContext } from "../../Context";
import { IRouteComponentProps } from "../../Routing/makeRouteComponent";
import flatten from "../../Utils/flatten";

export default class Glossary extends React.Component<IRouteComponentProps> {
    render() {
        return (
            <MHTitle title="Glossary" autoCrumbs>
                <GlossaryEntryTabs />
            </MHTitle>
        );
    }
}

const GlossaryEntryTabs = withContext(class GlossaryEntryTabsC extends React.Component<{context: IMathHubContext}> {
    render() {
        return (
            <LoadWithSpinner title="Glossary" promise={this.getGlossary}>{
                (glossary: IGlossaryEntry[]) =>
                    <GlossaryTab glossary={glossary} />
            }</LoadWithSpinner>
        );

    }

    private readonly getGlossary = async () => this.props.context.glossaryClient.loadAll();
});

class GlossaryTab extends React.Component<{ glossary: IGlossaryEntry[] }> {
    state = { activeIndex: 0 };

    render() {
        const { glossary } = this.props;

        return (
            <Tab
                panes={this.createPanes(glossary)}
                activeIndex={this.state.activeIndex}
                onTabChange={this.handleTabChange}
            />
        );
    }

    private readonly changeTab = (language: TKnownLanguages) => (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        this.setState({ activeIndex: knownLanguages.indexOf(language) });
    }

    private readonly handleTabChange = (e: React.MouseEvent<HTMLDivElement>, { activeIndex }: TabProps) => {
        this.setState({ activeIndex });
    }

    private static createEntries(glossary: IGlossaryEntry[], language: TKnownLanguages) {
        return flatten(glossary.map(entry => (entry.kwd[language] || []).map((name, i) => {
            return { name, entry, i };
        }))).sort((l, r) => (l.name > r.name ? 1 : -1));
    }
    private createPanes(glossary: IGlossaryEntry[]) {
        return knownLanguages.map(l => {
            return {
                menuItem: l, render: () =>
                    (
                        <Card.Group itemsPerRow="1" style={{ marginTop: "1em" }}>
                            {
                                GlossaryTab.createEntries(
                                    glossary.filter(en => en.kwd[l] !== undefined), l,
                                )
                                .map(e => (
                                    <GlossaryEntry
                                        key={`${e.entry.id}_${e.i}`}
                                        name={e.name}
                                        entry={e.entry}
                                        language={l}
                                        changeTab={this.changeTab}
                                    />
                                ))
                            }
                        </Card.Group>
                    ),
            };
        });
    }
}
class GlossaryEntry extends React.Component<{
    entry: IGlossaryEntry;
    name: string;
    language: TKnownLanguages;
    changeTab: ((language: TKnownLanguages) => (e: React.MouseEvent<HTMLElement>) => void);
}> {
    state = { def: false, syn: false };
    render() {
        const { entry } = this.props;
        const { language } = this.props;
        const { name } = this.props;
        const definition = entry.def[language];

        if ((entry.kwd[language] || []).length === 1)
            return (
                <Card fluid onClick={this.handleClick}>
                    <Card.Content>
                        <Card.Header>
                            <Grid>
                                <Grid.Column width={11}>
                                    <HTML renderMath>{name}</HTML>
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <Container textAlign={"right"}>
                                        {this.other()}
                                    </Container>
                                </Grid.Column>
                            </Grid>
                        </Card.Header>
                        <Card.Description>
                            {this.showSynonyms()}
                            {this.showDefinition(definition)}
                        </Card.Description>
                    </Card.Content>
                </Card>
            );

        return (
            <Card fluid onClick={this.handleClick}>
                <Card.Content>
                    <Card.Header>
                        <Grid>
                            <Grid.Column width={11}>
                                <HTML renderMath>{name}</HTML>
                                <Button size={"small"} style={{ marginLeft: "1.5em" }} onClick={this.handleButtonClick}>
                                    synonyms
                                </Button>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Container textAlign={"right"}>
                                    {this.other()}
                                </Container>
                            </Grid.Column>
                        </Grid>
                    </Card.Header>
                    <Card.Description>
                        {this.showSynonyms()}
                        {this.showDefinition(definition)}
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }

    private readonly handleClick = () =>
        this.setState({
            def: !this.state.def,
        })
    private readonly handleButtonClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        this.setState({
            syn: !this.state.syn,
        });
    }

    private other() {
        const { entry } = this.props;
        const { language } = this.props;
        const { changeTab } = this.props;

        return knownLanguages
            .filter(l => (l !== language && entry.kwd[l] !== undefined))
            .map((l, i) =>
                (<Label key={`${entry.id}_${i}`} onClick={changeTab(l)}>{l}</Label>));
    }

    private showDefinition(definition?: string) {
        if (this.state.def)
            return (
                <HTML>{definition === undefined ? "" : definition}</HTML>
            );

        return null;
    }
    private showSynonyms() {
        const { entry } = this.props;
        const { language } = this.props;
        const { name } = this.props;
        const synonyms = (entry.kwd[language] || []).filter(k => k !== name).join(", ");
        if (this.state.syn && synonyms !== undefined)
            return (
                <HTML>{synonyms.length === 0 ? "" : `synonyms: ${synonyms}`}</HTML>
            );

        return null;
    }
}
