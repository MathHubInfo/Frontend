import * as React from "react";

import { Button, Container, Divider, Dropdown, Grid, Header, Input, Popup } from "semantic-ui-react";
import { LoadWithSpinner } from "../../components/common/lazy";
import { MathHTML } from "../../components/common/mathhtml";
import { IMathHubContext, WithContext } from "../../context";
import { IGlossaryEntry, TKnownLanguages } from "../../context/api";
import { languages } from "./glossary";

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

const Translator = WithContext((context: IMathHubContext) => class extends React.Component<{}> {
    constructor(props: {}) {
        super(props);
        this.getGlossary = this.getGlossary.bind(this);
    }

    private getGlossary() { return context.client.getGlossary(); }

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
            .filter((e) => e.kind === "entry")
            .find((e) => e.kwd[this.state.from] === this.state.input);
        const result = entry === undefined ? `${this.state.input} not found` : entry.kwd[this.state.to];
        const definition = entry === undefined ? "" : entry.def[this.state.to];
        this.setState({ output: result, def: definition });
    }
    public render() {
        const options = languages.map((l) => this.createDropdownItem(l, l, l));
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
                            content={< MathHTML children={this.state.def} renderMath />}
                        />
                    </Grid.Column>
                </Grid>
            </>
        );
    }
}
