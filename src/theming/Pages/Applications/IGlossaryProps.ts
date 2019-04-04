import { IGlossaryEntry, TKnownLanguages } from "../../../context/GlossaryClient";
import { IActionHeaderProps } from "../../Layout/IActionHeaderProps";
import { HTML } from "../../../context/LibraryClient/objects";

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

    // the general information about the Glossary
    header: React.ReactElement<IActionHeaderProps>;

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

    // a long, human-readable description of the dictionary
    description?: HTML;
}
