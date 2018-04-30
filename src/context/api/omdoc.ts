/** This file contains type definitions for all OMDOC types exposed by the MMT API */

//
// GROUP
//

export interface IGroupItem {
    name: string;
    description: string;
}

export interface IGroup extends IGroupItem {
    longDescription: string;
    maintainer: string;

    archives: IArchiveItem[];
}

export function GroupToItem(group: IGroup): IGroupItem {
    return {name: group.name, description: group.description };
}

//
// ARCHIVE
//

export interface IArchiveItem {
    name: string;
    group: string;
    description: string;
}

export interface IArchive extends IArchiveItem {
    longDescription: string;
    maintainer: string;

    modules: IModuleItem[];
}

export function ArchiveToItem(archive: IArchive): IArchiveItem {
    return {name: archive.name, group: archive.group, description: archive.description};
}

export function ArchiveID(archive: IArchive): string {
    return `${archive.group}/${archive.name}`;
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
