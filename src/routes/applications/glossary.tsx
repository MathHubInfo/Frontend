import * as React from "react";

import { Button, Card, Container, Divider, Grid, Header, Label, List, Tab } from "semantic-ui-react";

import { LoadWithSpinner } from "../../components/common/lazy";
import { MathHTML } from "../../components/common/mathhtml";
import { IMathHubContext, WithContext } from "../../context";
import { IGlossaryEntry, TKnownLanguages } from "../../context/api";

export const languages: TKnownLanguages[] = ["en", "de", "fr", "tr", "ro", "zhs", "zht"];

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

const GlossaryEntryTabs = WithContext((context: IMathHubContext) => class extends React.Component<{}> {

    constructor(props: {}) {
        super(props);
        this.getGlossary = this.getGlossary.bind(this);
    }

    private getGlossary() { return context.client.getGlossary(); }

    public render() {
        return (
            <LoadWithSpinner title="Glossary" promise={this.getGlossary}>{
                (glossary: IGlossaryEntry[]) =>
                    <GlossaryTab glossary={glossary} />
            }</LoadWithSpinner>
        );

    }
});

class GlossaryTab extends React.Component<{ glossary: IGlossaryEntry[] }> {

    public state = { activeIndex: 0 };

    public changeTab = (language: TKnownLanguages) => (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        this.setState({ activeIndex: languages.indexOf(language) });
    }
    public handleTabChange = (e: any, { activeIndex }: any) => {
        this.setState({ activeIndex });
    }
    private createEntries(entry: IGlossaryEntry, language: TKnownLanguages) {
        if (entry.kwd[language] === undefined) {
            return null;
        }
        return entry.kwd[language]!.map((k, i) =>
            (
                <GlossaryEntry
                    key={`${entry.id}_${i}`}
                    name={k}
                    entry={entry}
                    language={language}
                    changeTab={this.changeTab}
                />
            ),
        );
    }
    private createPanes(glossary: IGlossaryEntry[]) {
        return languages.map((l) => {
            return {
                menuItem: l, render: () =>
                    (
                        <List bulleted>
                            {glossary
                                .filter((e) => e.kind === "entry")
                                .map((entry) => this.createEntries(entry, l))
                            }
                        </List>
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
        return languages
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
                <MathHTML>{synonyms.length === 0 ? "" : `synonyms: ${synonyms}`}</MathHTML>
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
