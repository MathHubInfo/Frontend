import {MathHubConfig} from "context/config"

import { ArchiveListItem } from "./omdoc";
import { always } from "utils/promises";

export class MMTAPIClient {
    private readonly config: MathHubConfig;
    
    constructor(config: MathHubConfig) {
        this.config = config
    }

    /** gets a list of archives from MMT */
    getArchiveList(): Promise<ArchiveListItem[]> {
        return always([
            {
                "name": "MMT/urtheories", 
                "description": "The MMT urtheories thingy", 
                "namespace": this.config.mmtURL
            }, 
            {
                "name": "MMT/examples", 
                "description": "The MMT examples thingy", 
                "namespace": "http://example.com"
            }
        ])
    }
}