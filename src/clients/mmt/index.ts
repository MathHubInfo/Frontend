
import MMTClient from "./client";
export { default as MMTClient } from "./client";

import { MockClient } from "./mock";
import { RestClient } from "./rest";

/** creates a new client or mock client */
export default function createMMTClient(url: string): MMTClient {
    return url !== "" ? new RestClient(url) : new MockClient();
}
