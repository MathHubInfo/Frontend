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
    archive: string;
    name: string;
}

export interface IDocument extends IDocumentItem {
    modules: IModuleItem[];
}

//
// MODULE
//

export interface IModuleItem {
    archive: string;
    name: string;
}

export interface IModule extends IModuleItem {
    variants: string[];
}

export function ModuleToItem(module: IModule): IModuleItem {
    return {archive: module.archive, name: module.name};
}

//
// MODULE VARIANTS
//

export interface IVariantItem {
    module: string;
    variant: string;
}

export interface IVariant extends IVariantItem {
    presentation: HTML;
    source: string;
}

export function VariantToItem(variant: IVariant): IVariantItem {
    return {module: variant.module, variant: variant.variant};
}

//
// Helper types
//
export type URI = string;

/** anything that could be HTML */
export type HTML = string;
