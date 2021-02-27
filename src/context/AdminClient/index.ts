import HTTPClient from "../HTTPClient";

export default class AdminClient {
    constructor(private readonly ADMIN_URL: string | undefined, readonly client: HTTPClient) {
        if (!process.browser) throw new Error("AdminClient may only be instantiated on the client");
    }
    async status(): Promise<IAdminStatus> {
        // if we are mocking, then return a dummy unauthenticated object
        if (this.ADMIN_URL === undefined)
            return {
                user: {
                    username: undefined,
                    authenticated: false,
                    staff: false,
                },
                urls: {
                    login: "",
                    login_staff: "",
                    logout: "",
                },
            };

        // else fetch the status
        return this.client.getOrError<IAdminStatus>(`${this.ADMIN_URL}/status`);
    }
}

export interface IAdminStatus {
    user: {
        username?: string;
        authenticated: boolean;
        staff: boolean;
    };
    urls: {
        login: string;
        login_staff: string;
        logout: string;
    };
}
