import * as React from "react";
import intl from "react-intl-universal";
import { Button, Container, Divider, Dropdown, DropdownProps, Input } from "semantic-ui-react";

import { TKnownLanguages } from "../../../context/GlossaryClient";

import MHHTML from "../../../lib/components/MHHTML";
import { IDictionaryProps } from "../../../theming/Pages/Applications/IDictionaryProps";

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
