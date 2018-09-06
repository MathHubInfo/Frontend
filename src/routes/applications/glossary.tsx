import * as React from "react";

import { Card, Container, Divider, Grid, Header, List, Tab } from "semantic-ui-react";

import { LoadWithSpinner } from "../../components/common/lazy";
import { IMathHubContext, WithContext } from "../../context";
import { IGlossaryEntry, Pane, TKnownLanguages } from "../../context/api";

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

    private createPanes(glossary: IGlossaryEntry[]) {
        const languages: TKnownLanguages[] = ["en", "de", "fr", "tr", "ro", "zhs", "zht"];
        const panes: Pane[] = [];
        languages.map((l) => panes.push({
            menuItem: l, render: () =>
                (
                    <List bulleted>
                        {glossary
                            .filter((e) => e.kind === "entry")
                            .map((entry) =>
                                <GlossaryEntry key={entry.id} entry={entry} language={l} />)}
                    </List>
                ),
        }),
        );
        return panes;
    }
    private getGlossary() { return context.client.getGlossary(); }

    public render() {
        return (
            <LoadWithSpinner title="Glossary" promise={this.getGlossary}>{
                (glossary: IGlossaryEntry[]) =>
                    <Tab
                        panes={this.createPanes(glossary)}
                    />
            }</LoadWithSpinner>
        );

    }
});

class GlossaryEntry extends React.Component<{ entry: IGlossaryEntry, language: TKnownLanguages }> {
    public state = { show: false };

    private handleClick = () =>
        this.setState({
            show: !this.state.show,
        })
    private other() {
        const { entry } = this.props;
        const { language } = this.props;
        let ret = "=>";
        const languages: TKnownLanguages[] = ["en", "de", "fr", "tr", "ro", "zhs", "zht"];
        languages
            .filter((l) => (l !== language && entry.kwd[l] !== undefined))
            .map((l) => ret = ret + " " + l);
        if (ret === "=>") {
            return "";
        }
        return ret;
    }

    private showDefinition(definition?: string) {
        if (this.state.show) {
            return (
                <div dangerouslySetInnerHTML={{ __html: definition === undefined ? "" : definition }}/>
            );
        }
        return(<></>);
    }
    public render() {
        const { entry } = this.props;
        const { language } = this.props;
        if (entry.kwd[language] === undefined) {
            return (<></>);
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
                                    <h4>{this.other()}</h4>
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
