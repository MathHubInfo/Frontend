import * as React from "react";

import { Card, Container, Divider, Grid, Header, Label, List, Tab } from "semantic-ui-react";

import { LoadWithSpinner } from "../../components/common/lazy";
import { IMathHubContext, WithContext } from "../../context";
import { IGlossaryEntry, TKnownLanguages } from "../../context/api";

const languages: TKnownLanguages[] = ["en", "de", "fr", "tr", "ro", "zhs", "zht"];

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

    public state = { activeIndex: 0 };

    public changeTab = (language: TKnownLanguages) => () => {
        this.setState({ activeIndex: languages.indexOf(language) });
    }
    public handleTabChange = (e: any, { activeIndex }: any) =>
        this.setState({ activeIndex })

    private createPanes(glossary: IGlossaryEntry[]) {
        return languages.map((l) => {
            return {
                menuItem: l, render: () =>
                    (
                        <List bulleted>
                            {glossary
                                .filter((e) => e.kind === "entry")
                                .map((entry) =>
                                    <GlossaryEntry
                                        key={entry.id}
                                        entry={entry}
                                        language={l}
                                        changeTab={this.changeTab}
                                    />)}
                        </List>
                    ),
            };
        });
    }
    private getGlossary() { return context.client.getGlossary(); }

    public render() {
        return (
            <LoadWithSpinner title="Glossary" promise={this.getGlossary}>{
                (glossary: IGlossaryEntry[]) =>
                    <Tab
                        panes={this.createPanes(glossary)}
                        activeIndex={this.state.activeIndex}
                        onTabChange={this.handleTabChange}
                    />
            }</LoadWithSpinner>
        );

    }
});

class GlossaryEntry extends React.Component<{
    entry: IGlossaryEntry,
    language: TKnownLanguages,
    changeTab: ((language: TKnownLanguages) => () => void),
}> {

    public state = { show: false };

    private handleClick = () =>
        this.setState({
            show: !this.state.show,
        })

    private other() {
        const { entry } = this.props;
        const { language } = this.props;
        const { changeTab } = this.props;

        return languages
            .filter((l) => (l !== language && entry.kwd[l] !== undefined))
            .map((l) => <Label key={`${entry.id}_${l}`} onClick={changeTab(l)}>{l}</Label>);
    }

    private showDefinition(definition?: string) {
        if (this.state.show) {
            return (
                <div dangerouslySetInnerHTML={{ __html: definition === undefined ? "" : definition }} />
            );
        }
        return null;
    }
    public render() {
        const { entry } = this.props;
        const { language } = this.props;
        if (entry.kwd[language] === undefined) {
           return null;
        }
        const definition = entry.def[language];

        return (
            <Card fluid onClick={this.handleClick}>
                <Card.Content>
                    <Card.Header>
                        <Grid>
                            <Grid.Column width={11}>
                                <div>{entry.kwd[language]}</div>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Container textAlign={"right"}>
                                    {this.other()}
                                </Container>
                            </Grid.Column>
                        </Grid>
                    </Card.Header>
                    <Card.Description>
                        {this.showDefinition(definition)}
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}
