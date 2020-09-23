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

export const knownLanguages = ["en", "de", "fr", "tr", "ro", "zhs", "zht"] as const;
export type TKnownLanguages = typeof knownLanguages[number];
export function IsKnownLanguage(value: string): value is TKnownLanguages {
    return knownLanguages.indexOf(value as TKnownLanguages) !== -1;
}
