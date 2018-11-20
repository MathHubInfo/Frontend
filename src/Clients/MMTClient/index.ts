
import MMTClient from "./MMTClient";
// tslint:disable-next-line:export-name
export { default as MMTClient } from "./MMTClient";

import MockClient from "./MockClient";
import RestClient from "./RestClient";

// creates a new client or mock client
export default function createMMTClient(url: string): MMTClient {
    return url !== "" ? new RestClient(url) : new MockClient();
}
