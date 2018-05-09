/** This file contains type definitions for all OMDOC types exposed by the MMT API */

//
// GROUP
//

export interface IGroupItem {
    id: string;
    title: string;
    teaser: string;
}

export interface IGroup extends IGroupItem {
    description: string;
    responsible: string[];

    archives: IArchiveItem[];
}

export function GroupToItem(group: IGroup): IGroupItem {
    return {id: group.id, title: group.title, teaser: group.teaser };
}

//
// ARCHIVE
//

export interface IArchiveItem {
    id: string;
    group: string;
    title: string;

    teaser: string;
}

export interface IArchive extends IArchiveItem {
    description: string;
    responsible: string[];

    modules: IModuleItem[];
}

export function ArchiveToItem(archive: IArchive): IArchiveItem {
    return {id: archive.id, group: archive.group, title: archive.title, teaser: archive.teaser};
}

export function ArchiveID(archive: IArchive): string {
    return `${archive.group}/${archive.id}`;
}

//
// MODULE
//

export interface IModuleItem {
    name: string;
    archive: string;
}

export interface IModule extends IModuleItem {
    content: string;
}

export function ModuleToItem(module: IModule): IModuleItem {
    return {name: module.name, archive: module.archive };
}

// TODO: More below

//
// DECLARATION
//

//
// OBJECT
//

//
// URI
//
export type URI = string;
