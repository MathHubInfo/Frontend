// tslint:disable:export-name
import HTTPClient from "../HTTPClient";
import LibraryClient from "./LibraryClient";
import MockClient from "./MockClient";
import RestClient from "./RestClient";

// creates a new client or mock client
export default function createLibraryClient(url: string, client: HTTPClient): LibraryClient {
    return url !== "" ? new RestClient(url, client) : new MockClient();
}

export { default as LibraryClient } from "./LibraryClient";
