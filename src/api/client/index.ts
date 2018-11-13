import { Client } from "./client";
import { MockClient } from "./mock";
import { RestClient } from "./rest";

export { Client } from "./client";

/** creates a new client or mock client */
export function createClient(url: string): Client {
    return url !== "" ? new RestClient(url) : new MockClient();
}
