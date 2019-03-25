import * as React from "react";

import { TKnownLanguages } from "../../../../context/GlossaryClient";
import { createRecord } from "../../../../utils/createRecord";

import { IDictionaryProps } from "../../../../theming/Pages/Applications/IDictionaryProps";

export default class Dictionary extends React.Component<IDictionaryProps> {
    render() {
        const {knownLanguages, fromLanguage, toLanguage, translating, translationValid, text, translation} = this.props;
        const languageDict = createRecord(knownLanguages, k => k);

        let statusText = "";
        if (!translationValid)
            statusText = translating ? "Translating ..." : "Press Translate to translate";

        return (
            <>
                <p>
                    From:&nbsp;
                    <Dropdown value={fromLanguage} options={languageDict} onChange={this.changeFromLanguage} />
                    &nbsp;
                    To:&nbsp;
                    <Dropdown value={toLanguage} options={languageDict} onChange={this.changeToLanguage} />
                </p>
                <hr />
                <div>
                    <textarea rows={20} style={{ width: "100%" }} onChange={this.changeText} value={text} />
                    <br />
                    <button disabled={translating} onClick={this.startTranslation}>Translate</button>
                </div>
                <hr />
                <div style={{ color: translationValid ? undefined : "grey" }}>
                    {(translationValid && translation) ?
                        <div>{translation.def[toLanguage]} {translation.kwd[toLanguage]}</div> : statusText}
                </div>
            </>
        );
    }

    private readonly changeFromLanguage = (fromLanguage: TKnownLanguages) => {
        this.props.changeFromLanguage(fromLanguage);
    }

    private readonly changeToLanguage = (toLanguage: TKnownLanguages) => {
        this.props.changeToLanguage(toLanguage);
    }

    private readonly changeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.props.changeText(event.target.value);
    }

    private readonly startTranslation = () => {
        this.props.startTranslation();
    }
}

interface IDropdownProps<K extends string> {
    value: K;
    options: Record<K, string>;
    onChange?(k: K): void;
}

class Dropdown<K extends string> extends React.Component<IDropdownProps<K>> {
    render() {
        const { options, value } = this.props;

        return (
            <select onChange={this.onChange} value={value}>{
                (Object.keys(options) as K[])
                    .map(o => <option value={o} key={o}>{options[o] || ""}</option>)
            }</select>
        );
    }

    private readonly onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (this.props.onChange)
            this.props.onChange(event.target.value as K);
    }
}
