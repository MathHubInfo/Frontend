/** This file contains type definitions for all OMDOC types exposed by the MMT API */

//
// GROUP
//

export interface IGroupItem {
    id: string;
    title: HTML;
    teaser: HTML;
}

export interface IGroup extends IGroupItem {
    description: HTML;
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
    title: HTML;

    teaser: HTML;
}

export interface IArchive extends IArchiveItem {
    description: HTML;
    responsible: string[];

    documents: IDocumentItem[];
}

export function ArchiveToItem(archive: IArchive): IArchiveItem {
    return {id: archive.id, group: archive.group, title: archive.title, teaser: archive.teaser};
}

export function ArchiveID(archive: IArchive): string {
    return `${archive.group}/${archive.id}`;
}

//
// DOCUMENT
//
export interface IDocumentItem {
    id: string;
    group: string;
    archive: string;
    name: string;
}

export interface IDocument extends IDocumentItem {
    modules: IModuleItem[];
}

export function DArchiveID(document: IDocument): string {
    return `${document.group}/${document.archive}`;
}

export function DocumentID(document: IDocument): string {
    return `${document.group}/${document.archive}/${document.id}`;
}

export function DocumentToItem(document: IDocument): IDocumentItem {
    return {id: document.id, name: document.name, group: document.group, archive: document.archive};
}

//
// MODULE
//

export interface IModuleItem {
    group: string;
    archive: string;
    document: string;
    name: string;
}

export interface IModule extends IModuleItem {
    presentation: HTML;
    source: string;
}

export function MDocumentID(module: IModule): string {
    return `${module.group}/${module.archive}/${module.document}`;
}

export function ModuleToItem(module: IModule): IModuleItem {
    return {group: module.group, archive: module.archive, document: module.document, name: module.name};
}

//
// Helper types
//
export type URI = string;

/** anything that could be HTML */
export type HTML = string;
