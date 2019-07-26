import dynamic from "next/dynamic";

import { IDocumentProps } from "./IDocumentProps";

const PageDocument: React.ComponentType<IDocumentProps> =
    dynamic(import("../../../themes/classic/Pages/Library/Document"));
export default PageDocument;
