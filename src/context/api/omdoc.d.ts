/** This file contains type definitions for all OMDOC types exposed by the MMT API */


//
// ARCHIVE
//

export interface ArchiveListItem {
    name: string, 
    description: string
    namespace?: URI
}

export interface Archive extends ArchiveListItem {
    documents: DocumentListItem[]
    namspace: URI
}

//
// DOCUMENT
//

export interface DocumentListItem {
    name: string
}


//
// MODULE
//

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