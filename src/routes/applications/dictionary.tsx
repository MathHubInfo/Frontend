import * as React from "react";

import { Button, Container, Divider, Dropdown, Grid, Header, Input, Popup } from "semantic-ui-react";

import { IGlossaryEntry, knownLanguages, TKnownLanguages } from "../../clients/mmt/objects";
import { IMathHubContext, withContext } from "../../context";

import { HTML } from "../../components/fragments";
import { LoadWithSpinner } from "../../components/loaders";

export class Dictionary extends React.Component<{}, {}> {
    public render() {
        return (
            <>
                <Container text>
                    <Header as="h1">
                        <div>Math Dictionary</div>
                    </Header>
                </Container>
                <Divider />
                <Translator />
            </>
        );
    }
}

const initialState: TKnownLanguages = "en";

const Translator = withContext<{}>(class TranslatorC extends React.Component<{context: IMathHubContext}> {
    constructor(props: {context: IMathHubContext}) {
        super(props);
        this.getGlossary = this.getGlossary.bind(this);
    }

    private getGlossary() { return this.props.context.mmtClient.getGlossary(); }

    public render() {
        return (
            <LoadWithSpinner title="Glossary" promise={this.getGlossary}>{
                (glossary: IGlossaryEntry[]) =>
                    <MathDictionary glossary={glossary} />
            }</LoadWithSpinner>
        );
    }
});

class MathDictionary extends React.Component<{ glossary: IGlossaryEntry[] }> {
    public state = { from: initialState, to: initialState, input: "", output: "", def: "" };

    private updateFrom = (e: any, { value }: any) => {
        this.setState({ from: value });
    }
    private updateTo = (e: any, { value }: any) => {
        this.setState({ to: value });
    }
    private updateInput = (e: any, { value }: any) => {
        this.setState({ input: value });
    }

    private createDropdownItem(key: string, text: TKnownLanguages, value: TKnownLanguages) {
        return { key, text, value };
    }

    private handleClick = () => {
        const { glossary } = this.props;
        const entry = glossary
            .filter((g) => g.kind === "entry")
            .find((e) =>
                e.kwd[this.state.from]!.find((s) => s === this.state.input) !== undefined);
        const result = entry === undefined ? `${this.state.input} not found` : entry.kwd[this.state.to];
        const definition = entry === undefined ? "" : entry.def[this.state.to];
        this.setState({ output: result, def: definition });
    }
    public render() {
        const options = knownLanguages.map((l: TKnownLanguages) => this.createDropdownItem(l, l, l));
        return (
            <>
                <Grid>
                    <Grid.Column width={7}>
                        From:
                        <Dropdown
                            placeholder="Select language"
                            selection
                            options={options}
                            onChange={this.updateFrom}
                        />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        To:
                        <Dropdown
                            placeholder="Select language"
                            selection
                            options={options}
                            onChange={this.updateTo}
                        />
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Button onClick={this.handleClick}>Translate</Button>
                    </Grid.Column>
                </Grid>
                <Grid>
                    <Grid.Column width={8}>
                        <Input fluid onChange={this.updateInput} size={"large"} />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Popup
                            trigger={<div>{this.state.output}</div>}
                            content={<HTML children={this.state.def} renderMath />}
                        />
                    </Grid.Column>
                </Grid>
            </>
        );
    }
}
