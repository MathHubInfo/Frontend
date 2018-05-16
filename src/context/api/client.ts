import {IMathHubConfig} from "../config";
// import { delay } from "utils/promises"

import axios from "axios";

import { ArchiveID, GroupToItem, IArchive, IGroup, IGroupItem, IModule } from "./omdoc";

/**
 * A client for the mathhub-mmt api
 */
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

/**
 * A client for the mathhub-mmt api that requests content via REST
 */
export class RestAPIClient extends MMTAPIClient {
    private get<T>(url: string): Promise<T> {
        return axios.get<T | string>(this.config.mmtURL + url).then((c) => {
            if (c.status !== 200 || typeof c.data === "string") {
                return Promise.reject(c.data as string);
            } else {
                return Promise.resolve(c.data as T);
            }
        });
    }

    public getGroups(): Promise<IGroupItem[]> {
        return this.get("content/groups");
    }

    public getGroup(id: string): Promise<IGroup> {
        return this.get("content/group/" + id);
    }

    public getArchive(id: string): Promise<IArchive> {
        return this.get("content/archive/" + id);
    }

    public getModule(id: string): Promise<IModule> {
        return this.get("content/module/" + id);
    }
}

/** An API client to MMT that mocks results by resolving them statically from a given datatset */
export class MockAPIClient extends MMTAPIClient {
    private delay<T>(p: Promise<T>): Promise<T> {
        return p; // return delay(p, 1000);
    }

    /** loads the dataset */
    private loadDataSet() { return import("./mock.json").then((m) => m.default); }

    public getGroups() { return this.delay(this.getGroupsI()); }
    private getGroupsI(): Promise<IGroupItem[]> {
        return this.loadDataSet().then((dataset) => {
            return Promise.resolve(dataset.groups.map(GroupToItem));
        });
    }

    public getGroup(name: string) { return this.delay(this.getGroupI(name)); }
    private getGroupI(name: string): Promise<IGroup> {
        return this.loadDataSet().then((dataset) => {
            const group = dataset.groups.find((g: IGroup) => g.id === name);
            if (group) {
                group.archives = dataset.archives.filter((a: IArchive) => a.group === name);
                return Promise.resolve(group);
            } else {
                return Promise.reject(`Group ${name} does not exist. `);
            }
        });
    }

    public getArchive(id: string) { return this.delay(this.getArchiveI(id)); }
    private getArchiveI(id: string): Promise<IArchive> {
        return this.loadDataSet().then((dataset) => {
            const archive = dataset.archives.find((a: IArchive) => ArchiveID(a) === id);
            if (archive) {
                archive.modules = dataset.modules.filter((m: IModule) => m.archive === id);
                return Promise.resolve(archive);
            } else {
                return Promise.reject(`Archive ${name} does not exist. `);
            }
        });
    }

    public getModule(name: string) { return this.delay(this.getModuleI(name)); }
    private getModuleI(name: string): Promise<IModule> {
        return this.loadDataSet().then((dataset) => {
            const module = dataset.modules.find((m: IModule) => m.name === name);
            if (module) {
                return Promise.resolve(module);
            } else {
                return Promise.reject(`Module ${name} does not exist. `);
            }
        });
    }
}
