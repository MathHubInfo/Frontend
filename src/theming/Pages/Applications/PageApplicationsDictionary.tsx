import * as React from "react";
import intl from "react-intl-universal";
import { Button, Container, Divider, Dropdown, DropdownProps, Input } from "semantic-ui-react";

import { IGlossaryEntry, TKnownLanguages } from "../../../context/GlossaryClient";
import { HTML } from "../../../context/LibraryClient/objects";

import MHHTML from "../../../lib/components/MHHTML";
import { IActionHeaderProps } from "../../Layout/ActionHeader";

interface IDictionaryProps extends IDictionaryState {
    /**
     * A list of all known languages
     */
    knownLanguages: readonly TKnownLanguages[];

    // the general information about the Dictionary
    header: React.ReactElement<IActionHeaderProps>;

    /**
     * Ref to update the language to translate from
     */
    changeFromLanguage(fromLanguage: TKnownLanguages): void;

    /**
     * Ref to update the language to translate to
     */
    changeToLanguage(toLanguage: TKnownLanguages): void;

    /**
     * Ref to update text to translate to
     */
    changeText(text: string): void;

    /**
     * Ref to start translation
     */
    startTranslation(): void;
}

export interface IDictionaryState extends IDictionaryImplicits {
    /**
     * the string representing the currently translated object
     */
    translation: IGlossaryEntry | undefined;

    /**
     * An boolean indicating if we are currently translating
     */
    translating: boolean;

    /**
     * A boolean indiciating if the current translation is valid
     * (or undefined if no transltation attempt has been started)
     */
    translationValid: boolean | undefined;
}


export interface IDictionaryImplicits {
    /**
     * The language to translation from
     */
    fromLanguage: TKnownLanguages;

    /**
     * The language to translate to
     */
    toLanguage: TKnownLanguages;

    /**
     * The text to be translated
     */
    text: string;

    // a long, human-readable description of the dictionary
    description?: HTML;
}


export default class PageApplicationsDictionary extends React.Component<IDictionaryProps> {
    render() {
        const { knownLanguages, fromLanguage, toLanguage } = this.props;
        const { translating, translationValid } = this.props;

        let statusText = "";
        if (!translationValid)
            statusText = translating ? intl.get("translatng") : intl.get("press");

        return (
            <Container>
                <h1>{intl.get("dictionary")}</h1>
                {this.props.header}
                {intl.get("from:")}&nbsp;
                <LanguageDropdown
                    value={fromLanguage}
                    options={knownLanguages}
                    onChange={this.changeFromLanguage}
                />
                &nbsp;
                {intl.get("to:")}&nbsp;
                    <LanguageDropdown value={toLanguage} options={knownLanguages} onChange={this.changeToLanguage} />
                <Divider />
                <div>
                    <Input style={{ width: "70%" }} onChange={this.changeText} />
                    <br />
                    <Button disabled={translating} onClick={this.startTranslation} style={{ marginTop: "1em" }}>
                    {intl.get("translate")}
                    </Button>
                </div>
                <Divider />
                {this.showTranslation(statusText)}
            </Container>
        );
    }

    private showTranslation(statusText: string) {
        const { toLanguage, translationValid, translation } = this.props;

        if (translation && translationValid) {
            const kwd = translation.kwd[toLanguage];
            const def = translation.def[toLanguage];

            return (
                <>
                    {kwd && <b><MHHTML>{kwd.join(", ")}</MHHTML></b>}
                    <div>{def && <MHHTML>{def}</MHHTML>}</div>
                </>
            );
        }

        return <div style={{ color: "grey" }}>{statusText}</div>;
    }
    private readonly changeFromLanguage = (fromLanguage: TKnownLanguages) => {
        this.props.changeFromLanguage(fromLanguage);
    }

    private readonly changeToLanguage = (toLanguage: TKnownLanguages) => {
        this.props.changeToLanguage(toLanguage);
    }

    private readonly changeText = (event: React.ChangeEvent<HTMLInputElement>, { }) => {
        this.props.changeText(event.target.value);
    }

    private readonly startTranslation = () => {
        this.props.startTranslation();
    }
}

interface IDropdownProps<K extends string> {
    value: K;
    options: readonly string[];
    onChange?(k: K): void;
}

class LanguageDropdown<K extends string> extends React.Component<IDropdownProps<K>> {
    render() {
        const { options, value } = this.props;

        return (
            <Dropdown
                text={value}
                selection
                options={options.map(o => ({ text: o, value: o }))}
                onChange={this.onChange}
            />
        );
    }

    private readonly onChange = ({ }, data: DropdownProps) => {
        if (this.props.onChange)
            this.props.onChange(data.value as K);
    }
}
