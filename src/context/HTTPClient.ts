interface IHTTPClientOptions {
    // If set to true, automatically resolve the options
    resolve?: boolean;
    // If set to true, ignore errors and return undefined instead
    ignoreError?: boolean;

    // function used to check result
    checker?: TChecker;
}

type TChecker = (data: {}) => boolean | Promise<boolean>;

export default class HTTPClient {
    constructor(public resolve: (s: string) => string) {}

    /**
     * Gets data from a url if it returns HTTP 200, or undefined if HTTP 404
     * Everything else throws an error
     * @param url URL to get
     */
    async getIfOK<T>(
        url: string,
        {checker, resolve, ignoreError}: IHTTPClientOptions = {},
    ): Promise<T | undefined> {
        let res;
        try {
            res = await fetch(resolve ? this.resolve(url) : url);
        } catch (e) {
            if (ignoreError) return undefined;
            throw e;
        }

        // handle non-200 status-code
        if (res.status === 404) return undefined;
        else if (res.status !== 200) throw new Error(`Got unexpected status code ${res.status}`);

        return HTTPClient.checkOrError(await res.json(), checker);
    }

    /**
     * Gets data from a url if it returns HTTP 200, or throws an error
     * @param url URL to get
     */
    async getOrError<T>(
        url: string,
        {checker, resolve}: IHTTPClientOptions = {},
    ): Promise<T> {
        const res = await fetch(resolve ? this.resolve(url) : url);
        if (res.status !== 200) throw new Error(`Got status code ${res.status}, expected code 200`);

        return HTTPClient.checkOrError(await res.json(), checker);
    }

    private static async checkOrError<T>(data: T, checker?: TChecker): Promise<T> {
        const theChecker = checker ? checker : (d: {}) => typeof d !== "string";

        let checkResult;
        try {
            checkResult = await theChecker(data);
        } catch (e) {
            checkResult = false;
        }

        if (!checkResult) throw new Error("data failed checker");

        return data;
    }
}
