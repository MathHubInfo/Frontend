/** This file contains type definitions for all OMDOC types exposed by the MMT API */

//
// GROUP
//

export interface GroupItem {
    name: string, 
    description: string
}

export interface Group extends GroupItem {
    maintainer: string, 
    
    archives: ArchiveItem[]
}

export function GroupToItem(group: Group): GroupItem {
    return {name: group.name, description: group.description }
}

//
// ARCHIVE
//

export interface ArchiveItem {
    name: string, 
    group: string, 
    description: string, 
}

export interface Archive extends ArchiveItem {
    maintainer: string, 

    modules: ModuleItem[]
}

export function ArchiveToItem(archive: Archive): ArchiveItem {
    return {name: archive.name, group: archive.group, description: archive.description}
}

//
// MODULE
//

export interface ModuleItem {
    name: string, 
    archive: string
}

export interface Module extends ModuleItem {
    content: string
}

export function ModuleToItem(module: Module) : ModuleItem {
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
export type URI = string