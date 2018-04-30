import {IMathHubConfig} from "../config";

import { IArchive, IGroup, IGroupItem, IModule } from "./omdoc";

export abstract class MMTAPIClient {
    protected readonly config: IMathHubConfig;

    constructor(config: IMathHubConfig) {
        this.config = config;
    }

    /** gets a list of archives from MMT */
    public abstract getGroups(): Promise<IGroupItem[]>;

    /** gets a specific group from MMT */
    public abstract getGroup(id: string): Promise<IGroup>;

    /** gets a given archive */
    public abstract getArchive(id: string): Promise<IArchive>;

    /** gets a specific module */
    public abstract getModule(id: string): Promise<IModule>;
}
