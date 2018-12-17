import { IGlossaryEntry, TKnownLanguages } from "../../../context/GlossaryClient";

export interface IGlossaryProps extends IGlossaryState {
    /**
     * A list of all known languages
     */
    knownLanguages: TKnownLanguages[];

    /**
     * The list of known glossary entries
     * available in the selected language
     */
    entries: IGlossaryEntry[];

    /**
     * Ref to change the language
     */
    changeLanguage(language: TKnownLanguages): void;
}

export interface IGlossaryState {
    /**
     * the currently selected language
     */
    language: TKnownLanguages;
}
