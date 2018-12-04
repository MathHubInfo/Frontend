import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Button, Dropdown, DropdownProps, Grid, Input, InputOnChangeData, Popup } from "semantic-ui-react";

import { IGlossaryEntry, knownLanguages, TKnownLanguages } from "../../Clients/GlossaryClient";
import { HTML, MHTitle } from "../../Components/Fragments";
import { LoadWithSpinner } from "../../Components/Loaders";
import { IMathHubContext, withContext } from "../../Context";

export default class Dictionary extends React.Component<RouteComponentProps> {
    render() {
        return (
            <MHTitle title={"Math Dictionary"} autoCrumbs>
                <Translator />
            </MHTitle>
        );
    }
}

const initialState: TKnownLanguages = "en";

const Translator = withContext(class TranslatorC extends React.Component<{context: IMathHubContext}> {
    constructor(props: {context: IMathHubContext}) {
        super(props);
        this.getGlossary = this.getGlossary.bind(this);
    }

    render() {
        return (
            <LoadWithSpinner title="Glossary" promise={this.getGlossary}>{
                (glossary: IGlossaryEntry[]) =>
                    <MathDictionary glossary={glossary} />
            }</LoadWithSpinner>
        );
    }

    private readonly getGlossary = async () => this.props.context.glossaryClient.loadAll();
});

class MathDictionary extends React.Component<{ glossary: IGlossaryEntry[] }> {
    state = { from: initialState, to: initialState, input: "", output: "", def: "" };
    render() {
        const options = knownLanguages.map((l: TKnownLanguages) => MathDictionary.createDropdownItem(l, l, l));

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

    private readonly updateFrom = (e: React.SyntheticEvent<HTMLElement>, { value }: DropdownProps) => {
        this.setState({ from: value });
    }
    private readonly updateTo = (e: React.SyntheticEvent<HTMLElement>, { value }: DropdownProps) => {
        this.setState({ to: value });
    }
    private readonly updateInput = (e: React.ChangeEvent<HTMLInputElement>, { value }: InputOnChangeData) => {
        this.setState({ input: value });
    }

    private static createDropdownItem(key: string, text: TKnownLanguages, value: TKnownLanguages) {
        return { key, text, value };
    }

    private readonly handleClick = () => {
        const { glossary } = this.props;
        const entry = glossary
            .find(e =>
                (e.kwd[this.state.from] || []).find(s => s === this.state.input) !== undefined);
        const result = entry === undefined ? `${this.state.input} not found` : entry.kwd[this.state.to];
        const definition = entry === undefined ? "" : entry.def[this.state.to];
        this.setState({ output: result, def: definition });
    }
}
