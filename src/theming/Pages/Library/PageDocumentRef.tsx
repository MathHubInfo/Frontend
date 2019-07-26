import dynamic from "next/dynamic";

import { IDocumentRefProps } from "./IDocumentRefProps";

const PageDocumentRef: React.ComponentType<IDocumentRefProps> =
    dynamic(import("../../../themes/classic/Pages/Library/DocumentRef"));

export default PageDocumentRef;
