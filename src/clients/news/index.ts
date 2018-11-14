import Axios from "axios";

export default class NewsClient {
    /**
     * Creates a new LoggerClient
     * @param NEWS_URL The URL this client talks to (if any)
     */
    constructor(NEWS_URL: string) {
        this.NEWS_URL = NEWS_URL;
    }
    private NEWS_URL: string;

    private cache: INewsItem[] | undefined;

    public async loadAll(): Promise<INewsItem[]> {
        // if we have a cached result, return it
        if (typeof this.cache !== "undefined") {
            return this.cache;
        }
        // else we need to load and fill the cache
        this.cache = await this.loadAllInternal();
        return this.cache;
    }

    private async loadAllInternal(): Promise<INewsItem[]> {
        if (this.NEWS_URL === "") {
            const news = await import("../../../assets/news.json");
            return news.default;
        } else {
            const res = await Axios.get<INewsItem[]>(this.NEWS_URL);
            return res.data;
        }
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
