// tslint:disable: export-name
import HTTPClient from "../HTTPClient";

import { IGlossaryEntry, TKnownLanguages } from "../GlossaryClient";

export default class TranslationClient {
    constructor(readonly CLIENT_URL: string | undefined, readonly client: HTTPClient) {}

    /**
     * Translates text from one language into another
     * @param text Text to translate
     * @param frm Language to translate from
     * @param to Language to translate to
     */
    async translate(text: string, frm: TKnownLanguages, to: TKnownLanguages): Promise<IGlossaryEntry> {
        try {
            throw new Error("Unimplemented");
        } catch (e) {
            throw new Error(`${text} can not be translated from ${frm} to ${to}: Unimplemented`);
        }
    }
}
