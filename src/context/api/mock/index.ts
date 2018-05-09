import { IMathHubConfig } from "../../config";
import { MMTAPIClient } from "../client";

import { ArchiveID, GroupToItem, IArchive, IGroup, IGroupItem, IModule } from "../omdoc";

// import { delay } from "utils/promises"

import mockdata from "./data.json";

/** An API client to MMT that mocks results by resolving them statically from a given datatset */
export class MockMMTClient extends MMTAPIClient {

    private readonly dataset: IMockMMTDataset;

    constructor(config: IMathHubConfig, dataset?: IMockMMTDataset) {
        super(config);
        this.dataset = dataset || mockdata;
    }

    private delay<T>(p: Promise<T>): Promise<T> {
        return p; // return delay(p, 1000);
    }

    public getGroups() { return this.delay(this.getGroupsI()); }
    private getGroupsI(): Promise<IGroupItem[]> {
        return Promise.resolve(this.dataset.groups.map(GroupToItem));
    }

    public getGroup(name: string) { return this.delay(this.getGroupI(name)); }
    private getGroupI(name: string): Promise<IGroup> {
        const group = this.dataset.groups.find((g) => g.id === name);
        if (group) {
            group.archives = this.dataset.archives.filter((a) => a.group === name);
            return Promise.resolve(group);
        } else {
            return Promise.reject(`Group ${name} does not exist. `);
        }
    }

    public getArchive(id: string) { return this.delay(this.getArchiveI(id)); }
    private getArchiveI(id: string): Promise<IArchive> {
        const archive = this.dataset.archives.find((a) => ArchiveID(a) === id);
        if (archive) {
            archive.modules = this.dataset.modules.filter((m) => m.archive === id);
            return Promise.resolve(archive);
        } else {
            return Promise.reject(`Archive ${name} does not exist. `);
        }
    }

    public getModule(name: string) { return this.delay(this.getModuleI(name)); }
    private getModuleI(name: string): Promise<IModule> {
        const module = this.dataset.modules.find((m) => m.name === name);
        if (module) {
            return Promise.resolve(module);
        } else {
            return Promise.reject(`Module ${name} does not exist. `);
        }
    }
}

interface IMockMMTDataset {
    groups: IGroup[];
    archives: IArchive[];
    modules: IModule[];
}
