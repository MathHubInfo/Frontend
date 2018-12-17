import * as React from "react";

import { IGlossaryEntry, TKnownLanguages } from "../../../../context/GlossaryClient";

import MHHTML from "../../../../lib/components/MHHTML";
import { IGlossaryProps } from "../../../../theming/Pages/Applications/IGlossaryProps";

export default class Glossary extends React.Component<IGlossaryProps> {
    render() {
        const { language: selectedLanguage, changeLanguage, entries } = this.props;

        return (
            <div>
                <table style={{width: "100%"}}>
                    <thead>
                        <tr>
                            <th style={{width: "10%"}}>Name</th>
                            <th style={{width: "10%"}}>Languages</th>
                            <th style={{width: "40%"}}>Definition</th>
                            <th style={{width: "40%"}}>Synonyms</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map(e =>
                            <GlossaryEntry
                                key={e.id}
                                selectedLanguage={selectedLanguage}
                                entry={e}
                                changeLanguage={changeLanguage}
                            />)}
                    </tbody>
                </table>
            </div>
        );
    }
}

interface IGlossaryEntryProps {
    selectedLanguage: TKnownLanguages;
    changeLanguage: IGlossaryProps["changeLanguage"];
    entry: IGlossaryEntry;
}

class GlossaryEntry extends React.Component<IGlossaryEntryProps> {
    render() {
        const { entry, selectedLanguage, changeLanguage } = this.props;

        // definition of the current entry
        const def = entry.def[selectedLanguage];
        if (!def) return null;

        // keywords in the current entry
        const kwd = entry.kwd[selectedLanguage];
        if (!kwd) return null;

        // known languages
        const available = Object.keys({...entry.kwd, ...entry.def}).sort() as TKnownLanguages[];

        return (
            <tr>
                <td>{kwd[0]}</td>
                <td>{available.map(l =>
                    <LanguageLink
                        key={l}
                        language={l}
                        selectedLanguage={selectedLanguage}
                        changeLanguage={changeLanguage}
                    />)}</td>
                <td><MHHTML>{def}</MHHTML></td>
                <td>{kwd.slice(1).join(", ")}</td>
            </tr>
        );
    }
}

interface ILanguageLinkProps {
    language: TKnownLanguages;
    selectedLanguage: TKnownLanguages;
    changeLanguage: IGlossaryProps["changeLanguage"];
}

class LanguageLink extends React.Component<ILanguageLinkProps> {
    render() {
        const {language, selectedLanguage} = this.props;

        if (language === selectedLanguage)
            return <><b>{language}</b>&nbsp;</>;
        else
            return <><button onClick={this.changeLanguage}>{language}</button>&nbsp;</>;
    }

    private readonly changeLanguage = () => this.props.changeLanguage(this.props.language);
}
