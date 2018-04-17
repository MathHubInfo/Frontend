import {MathHubConfig} from "context/config"

import { GroupItem, Group, Archive, Module } from "./omdoc";

export abstract class MMTAPIClient {
    protected readonly config: MathHubConfig;
    
    constructor(config: MathHubConfig) {
        this.config = config
    }

    /** gets a list of archives from MMT */
    abstract getGroups(): Promise<GroupItem[]>
    
    /** gets a specific group from MMT */
    abstract getGroup(name: string) : Promise<Group>

    /** gets a given archive */
    abstract getArchive(name: string) : Promise<Archive>

    /** gets a specific module */
    abstract getModule(name: string) : Promise<Module>
}