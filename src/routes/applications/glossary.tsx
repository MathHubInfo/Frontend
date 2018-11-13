import * as React from "react";

import { Button, Card, Container, Divider, Grid, Header, Label, Tab } from "semantic-ui-react";

import { IGlossaryEntry, knownLanguages, TKnownLanguages } from "../../api";
import { LoadWithSpinner, MathHTML } from "../../components/common";
import { IMathHubContext, withContext } from "../../context";

export class Glossary extends React.Component<{}, {}> {
    public render() {
        return (
            <>
                <Container text>
                    <Header as="h1">
                        <div>Glossary</div>
                    </Header>
                </Container>
                <Divider />
                <GlossaryEntryTabs />
            </>
        );
    }
}

const GlossaryEntryTabs = withContext<{}>(class GlossaryEntryTabsC extends React.Component<{context: IMathHubContext}> {

    constructor(props: {context: IMathHubContext}) {
        super(props);
        this.getGlossary = this.getGlossary.bind(this);
    }

    private getGlossary() { return this.props.context.client.getGlossary(); }

    public render() {
        return (
            <LoadWithSpinner title="Glossary" promise={this.getGlossary}>{
                (glossary: IGlossaryEntry[]) =>
                    <GlossaryTab glossary={glossary} />
            }</LoadWithSpinner>
        );

    }
});

interface IEntry {
    name: string;
    entry: IGlossaryEntry;
    i: number;
}
class GlossaryTab extends React.Component<{ glossary: IGlossaryEntry[] }> {

    public state = { activeIndex: 0 };

    public changeTab = (language: TKnownLanguages) => (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        this.setState({ activeIndex: knownLanguages.indexOf(language) });
    }

    public handleTabChange = (e: any, { activeIndex }: any) => {
        this.setState({ activeIndex });
    }

    private flatten(array: IEntry[][]) {
        const result: IEntry[] = [];
        array.forEach((fst) => fst.forEach((snd) => result.push(snd)));
        return result;
    }
    private createEntries(glossary: IGlossaryEntry[], language: TKnownLanguages) {
        return this.flatten(glossary.map((entry) => entry.kwd[language]!.map((name, i) => {
            return { name, entry, i };
        }))).sort((l, r) => (l.name > r.name ? 1 : -1));
    }
    private createPanes(glossary: IGlossaryEntry[]) {
        return knownLanguages.map((l) => {
            return {
                menuItem: l, render: () =>
                    (
                        <Card.Group itemsPerRow="1" style={{ marginTop: "1em" }}>
                            {
                                this.createEntries(
                                    glossary.filter((en) => en.kind === "entry" && en.kwd[l] !== undefined), l,
                                )
                                .map((e) => (
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

    public render() {
        const { glossary } = this.props;
        return (
            <Tab
                panes={this.createPanes(glossary)}
                activeIndex={this.state.activeIndex}
                onTabChange={this.handleTabChange}
            />
        );
    }
}
class GlossaryEntry extends React.Component<{
    entry: IGlossaryEntry,
    name: string,
    language: TKnownLanguages,
    changeTab: ((language: TKnownLanguages) => (e: React.MouseEvent<HTMLElement>) => void),
}> {

    public state = { def: false, syn: false };

    private handleClick = () =>
        this.setState({
            def: !this.state.def,
        })
    private handleButtonClick = (e: React.MouseEvent<HTMLElement>) => {
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
            .filter((l) => (l !== language && entry.kwd[l] !== undefined))
            .map((l, i) =>
                (<Label key={`${entry.id}_${i}`} onClick={changeTab(l)}>{l}</Label>));
    }

    private showDefinition(definition?: string) {
        if (this.state.def) {
            return (
                <MathHTML>{definition === undefined ? "" : definition}</MathHTML>
            );
        }
        return null;
    }
    private showSynonyms() {
        const { entry } = this.props;
        const { language } = this.props;
        const { name } = this.props;
        const synonyms = entry.kwd[language]!.filter((k) => k !== name).join(", ");
        if (this.state.syn && synonyms !== undefined) {
            return (
                <MathHTML >{synonyms.length === 0 ? "" : `synonyms: ${synonyms}`}</MathHTML>
            );
        }
        return null;
    }
    public render() {
        const { entry } = this.props;
        const { language } = this.props;
        const { name } = this.props;
        const definition = entry.def[language];
        if (entry.kwd[language]!.length === 1) {
            return (
                <Card fluid onClick={this.handleClick}>
                    <Card.Content>
                        <Card.Header>
                            <Grid>
                                <Grid.Column width={11}>
                                    <MathHTML renderMath>{name}</MathHTML>
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
        return (
            <Card fluid onClick={this.handleClick}>
                <Card.Content>
                    <Card.Header>
                        <Grid>
                            <Grid.Column width={11}>
                                <MathHTML renderMath>{name}</MathHTML>
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
}
