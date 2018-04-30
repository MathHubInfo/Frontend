import {MathHubConfig} from "../config"

import { GroupItem, Group, Archive, Module } from "./omdoc";

export abstract class MMTAPIClient {
    protected readonly config: MathHubConfig;
    
    constructor(config: MathHubConfig) {
        this.config = config
    }

    /** gets a list of archives from MMT */
    abstract getGroups(): Promise<GroupItem[]>
    
    /** gets a specific group from MMT */
    abstract getGroup(id: string) : Promise<Group>

    /** gets a given archive */
    abstract getArchive(id: string) : Promise<Archive>

    /** gets a specific module */
    abstract getModule(id: string) : Promise<Module>
}