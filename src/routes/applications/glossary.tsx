import * as React from "react";

import { Container, Divider, Header, List, Tab } from "semantic-ui-react";

import { LoadWithSpinner } from "../../components/common/lazy";
import { IMathHubContext, WithContext } from "../../context";
import { IGlossaryEntry } from "../../context/api";

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
                    <Tab
                        panes={[
                            {
                                menuItem: "en", render: () =>
                                <List bulleted>
                                    {glossary
                                        .filter((e) => e.kind === "entry" && e.language === "en")
                                        .map((entry) => <GlossaryEntry key={entry.id} entry={entry} />)}
                                </List>,
                            },
                            {
                                menuItem: "de", render: () =>
                                <List bulleted>
                                    {glossary
                                        .filter((e) => e.kind === "entry" && e.language === "de")
                                        .map((entry) => <GlossaryEntry key={entry.id} entry={entry} />)}
                                </List>,
                            },
                            {
                                menuItem: "ro", render: () =>
                                <List bulleted>
                                    {glossary
                                        .filter((e) => e.kind === "entry" && e.language === "ro")
                                        .map((entry) => <GlossaryEntry key={entry.id} entry={entry} />)}
                                </List>,
                            },
                            {
                                menuItem: "tr", render: () =>
                                <List bulleted>
                                    {glossary
                                        .filter((e) => e.kind === "entry" && e.language === "tr")
                                        .map((entry) => <GlossaryEntry key={entry.id} entry={entry} />)}
                                </List>,
                            },
                            {
                                menuItem: "zht", render: () =>
                                <List bulleted>
                                    {glossary
                                        .filter((e) => e.kind === "entry" && e.language === "zht")
                                        .map((entry) => <GlossaryEntry key={entry.id} entry={entry} />)}
                                </List>,
                            },
                            {
                                menuItem: "zhs", render: () =>
                                <List bulleted>
                                    {glossary
                                        .filter((e) => e.kind === "entry" && e.language === "zhs")
                                        .map((entry) => <GlossaryEntry key={entry.id} entry={entry} />)}
                                </List>,
                            },
                        ]}
                    />
            }</LoadWithSpinner>
        );

    }
});

class GlossaryEntry extends React.Component<{ entry: IGlossaryEntry }> {
    public render() {
        const { entry } = this.props;
        return (
            <List.Item>
                <h3>{entry.name}</h3>
                <p>{entry.about}</p>
            </List.Item>
        );
    }
}
