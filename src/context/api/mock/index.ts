import { MMTAPIClient } from "../client"
import {MathHubConfig} from "../../config"

import { GroupItem, Group, GroupToItem, Archive, ArchiveID, Module } from "../omdoc";

// import { delay } from "utils/promises"

import mockdata from "./data.json"

/** An API client to MMT that mocks results by resolving them statically from a given datatset */
export class MockMMTClient extends MMTAPIClient {

    private readonly dataset: MockMMTDataset;

    constructor(config: MathHubConfig, dataset?: MockMMTDataset) {
        super(config)
        this.dataset = dataset || mockdata; 
    }

    private delay<T>(p: Promise<T>): Promise<T> {
        return p;//return delay(p, 1000); 
    }

    getGroups() { return this.delay(this.getGroupsI())};
    private getGroupsI(): Promise<GroupItem[]> { 
        return Promise.resolve(this.dataset.groups.map(GroupToItem));
    }

    getGroup(name: string) { return this.delay(this.getGroupI(name)); }
    private getGroupI(name: string): Promise<Group> {
        const group = this.dataset.groups.find((g) => g.name === name);
        if(group) {
            group.archives = this.dataset.archives.filter((a) => a.group === name);
            return Promise.resolve(group);
        } else {
            return Promise.reject(`Group ${name} does not exist. `);
        }
    }

    getArchive(id: string) { return this.delay(this.getArchiveI(id)); }
    private getArchiveI(id: string) : Promise<Archive> {
        const archive = this.dataset.archives.find((a) => ArchiveID(a) === id);
        if(archive) {
            archive.modules = this.dataset.modules.filter((m) => m.archive === id);
            return Promise.resolve(archive);
        } else {
            return Promise.reject(`Archive ${name} does not exist. `);
        }
    }

    getModule(name: string) { return this.delay(this.getModuleI(name)); }
    private getModuleI (name: string) : Promise<Module> {
        const module = this.dataset.modules.find((m) => m.name === name);
        if(module) {
            return Promise.resolve(module);
        } else {
            return Promise.reject(`Module ${name} does not exist. `); 
        }
    }
}

interface MockMMTDataset {
    groups: Group[]
    archives: Archive[]
    modules: Module[]
}