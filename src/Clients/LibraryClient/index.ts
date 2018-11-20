
import LibraryClient from "./LibraryClient";
// tslint:disable-next-line:export-name
export { default as LibraryClient } from "./LibraryClient";

import MockClient from "./MockClient";
import RestClient from "./RestClient";

// creates a new client or mock client
export default function createLibraryClient(url: string): LibraryClient {
    return url !== "" ? new RestClient(url) : new MockClient();
}
