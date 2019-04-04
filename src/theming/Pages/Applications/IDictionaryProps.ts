import { IGlossaryEntry, TKnownLanguages } from "../../../context/GlossaryClient";
import { IActionHeaderProps } from "../../Layout/IActionHeaderProps";
import { HTML } from "../../../context/LibraryClient/objects";

export interface IDictionaryProps extends IDictionaryState {
    /**
     * A list of all known languages
     */
    knownLanguages: TKnownLanguages[];

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
