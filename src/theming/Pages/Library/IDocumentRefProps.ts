import { IMHLinkable } from "../../../lib/components/MHLink";

import { IDocument, IDocumentRef } from "../../../context/LibraryClient/objects";

export interface IDocumentRefProps {
    link: IMHLinkable;
    item: IDocumentRef | IDocument;
}
