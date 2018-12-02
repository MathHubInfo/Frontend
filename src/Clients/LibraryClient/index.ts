
import HTTPClient from "../../Utils/HTTPClient";

import LibraryClient from "./LibraryClient";
import MockClient from "./MockClient";
import RestClient from "./RestClient";


// creates a new client or mock client
// tslint:disable-next-line:export-name
export default function createLibraryClient(url: string, client: HTTPClient): LibraryClient {
    return url !== "" ? new RestClient(url, client) : new MockClient();
}

// tslint:disable-next-line:export-name
export {default as LibraryClient} from "./LibraryClient";
