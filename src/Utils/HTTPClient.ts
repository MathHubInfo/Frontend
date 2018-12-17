import Axios, { AxiosError, AxiosResponse } from "axios";

import Parallel from "./Parallel";

// tslint:disable-next-line:no-any
type TChecker = (data: any) => boolean | Promise<boolean>;

export default class HTTPClient {
    constructor(public parallel: Parallel) {}

    /**
     * Gets data from a url if it returns HTTP 200, or undefined if HTTP 404
     * Everything else throws an error
     * @param url URL to get
     */
    async getIfOK<T>(url: string, checker?: TChecker): Promise<T | undefined> {
        let res: AxiosResponse<T>;
        try {
            res = await this.parallel.run(() => Axios.get<T>(url));
        } catch (e) {
            if ((e as AxiosError).response) {
                res = (e as AxiosError).response as AxiosResponse<T>;
                if (res.status !== 404) throw e;
            } else throw e;
        }

        // handle non-200 status-code
        if (res.status === 404) return undefined;
        else if (res.status !== 200) throw new Error(`Got unexpected status code ${res.status}`);

        return HTTPClient.checkOrError(res.data, checker);
    }

    /**
     * Gets data from a url if it returns HTTP 200, or throws an error
     * @param url URL to get
     */
    async getOrError<T>(url: string, checker?: TChecker): Promise<T> {
        const res = await this.parallel.run(() => Axios.get<T>(url));
        if (res.status !== 200) throw new Error(`Got status code ${res.status}, expected code 200`);

        return HTTPClient.checkOrError(res.data, checker);
    }

    private static async checkOrError<T>(data: T, checker?: TChecker): Promise<T> {
        // tslint:disable-next-line:no-any
        const theChecker = checker ? checker : (d: any) => typeof d !== "string";

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
