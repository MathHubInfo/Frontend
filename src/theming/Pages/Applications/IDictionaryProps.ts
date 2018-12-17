import { TKnownLanguages } from "../../../context/GlossaryClient";

export interface IDictionaryProps extends IDictionaryState {
    /**
     * A list of all known languages
     */
    knownLanguages: TKnownLanguages[];

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
    translation: string | undefined;

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
}
