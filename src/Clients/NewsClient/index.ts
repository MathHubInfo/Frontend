import FatClient from "../FatClient";

export default class NewsClient extends FatClient<INewsItem> {
    async load(id: string): Promise<INewsItem | undefined> {
        const items = await this.loadAll();

        return items.find((i: INewsItem) => i.id === id);
    }
    protected async mock(): Promise<INewsItem[]> {
        const news = await import("../../../assets/mock/news.json");

        return news.default;
    }
}

// a news item
export interface INewsItem {
    // the title of the news item
    title: string;

    // a unique ID for this news item
    id: string;

    // date (unix epoch) when this news item was created
    date: number;

    // arbitary (html) content of the news
    content: string;
}
