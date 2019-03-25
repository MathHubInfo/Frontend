import { EnumKeys, getEnumKeys, isEnumKey } from "../../utils/EnumKeys";

import FatClient from "../FatClient";

export default class GlossaryClient extends FatClient<IGlossaryEntry> {
    protected async mock(): Promise<IGlossaryEntry[]> {
        const glossary = await import("./mock.json");

        return glossary.default;
    }
}

// a single glossary entry
export interface IGlossaryEntry {
    id: string;
    kwd: {[k in TKnownLanguages]?: string[]};
    def: {[k in TKnownLanguages]?: string};
}

// known languages
enum Languages { en, de, fr, tr, ro, zhs, zht }
export type TKnownLanguages = EnumKeys<typeof Languages>;
export const isKnownLanguage = isEnumKey<typeof Languages>(Languages);
export const knownLanguages = getEnumKeys<typeof Languages>(Languages);
