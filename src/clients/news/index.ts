import FatClient from "../fat";

export default class NewsClient extends FatClient<INewsItem> {
    protected async mock(): Promise<INewsItem[]> {
        const news = await import("../../../assets/news.json");
        return news.default;
    }

    public async load(id: string): Promise<INewsItem | undefined> {
        const items = await this.loadAll();
        return items.find((i: INewsItem) => i.id === id);
    }
}

/** a news item */
export interface INewsItem {
    /** the title of the news item */
    title: string;

    /** a unique ID for this news item */
    id: string;

    /** date (unix epoch) when this news item was created */
    date: number;

    /** arbitary (html) content of the news */
    content: string;
}
